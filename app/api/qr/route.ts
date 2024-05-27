import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from "@supabase/supabase-js";
import { use } from "react";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_SECRET = process.env.SUPABASE_SERVICE_ROLE!;


const insertUseEntry = async (supabase: any, request: Request | any, qr_id: string, owner_id: string) => {
    await supabase
        .from('qr_uses')
        .insert([
            {
                qr_id, owner_id, user_data:
                    request.headers
            },
        ])
        .select()
}

export async function GET(request: Request) {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_SECRET);

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
        insertUseEntry(supabase, request, qr_code.id, qr_code.owner_id);

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
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_SECRET);

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

        insertUseEntry(supabase, request, qr_code.id, qr_code.owner_id);

        return Response.json({
            id: qr_code?.id,
            target: qr_code?.target,
        });
    };
}
