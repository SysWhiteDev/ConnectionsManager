type UsageWidgetProps = {
  uses: number;
};

export default function UsageWidget({
  uses,
}: UsageWidgetProps): React.JSX.Element {
  return (
    <div className="transition-opacity overflow-hidden flex justify-center items-center gap-6 py-8  rounded-md border-border bg-secondary  bg-opacity-5 border">
      <p className="text-6xl font-semibold">
        {uses || 0} use{uses == 1 ? "" : "s"}
      </p>
    </div>
  );
}
