import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from "@supabase/supabase-js";
import { use } from "react";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_SECRET = process.env.SUPABASE_SERVICE_ROLE!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_SECRET);

const insertUseEntry = async (request: Request | any, qr_id: string, owner_id: string) => {
    await supabase
        .from('qr_uses')
        .insert([
            {
                qr_id, owner_id, user_data: {
                    user_agent: request.headers.get('User-Agent'),
                    ip: request.headers.get('X-Forwarded-For') || request?.ip,
                    screen: {
                        width: request.headers.get('Screen-Width'),
                        height: request.headers.get('Screen-Height'),
                    },
                }
            },
        ])
        .select()
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id === undefined || !id) {
        return Response.json({ "error": "No id specified" })
    }

    let { data: qr_code, error } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('id', id)
        .single();

    if (qr_code.password === null) {
        insertUseEntry(request, qr_code.id, qr_code.owner_id);

        return Response.json({
            id: qr_code?.id,
            target: qr_code?.target,
            type: qr_code?.type,
            passwdAuth: false,
        });
    } else {
        return Response.json({
            id: qr_code?.id,
            type: qr_code?.type,
            passwdAuth: true,
        });
    }
}

export async function POST(request: Request) {
    const body = await request.json()
    const password = body.password;
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')


    let { data: qr_code, error } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('id', id)
        .single();


    const result = await bcrypt.compare(password, qr_code?.password);
    if (!result) {
        return Response.json({ "error": "Wrong Password" })
    } else {

        insertUseEntry(request, qr_code.id, qr_code.owner_id);

        return Response.json({
            id: qr_code?.id,
            target: qr_code?.target,
        });
    };
}
