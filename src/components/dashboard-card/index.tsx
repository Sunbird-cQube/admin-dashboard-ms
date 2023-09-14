export default function DashboardCard(props: any) {
  const { id, title, imageUrl, clickHandler } = props;
  return (
    <div id={id} className="bg-white shadow-lg rounded-lg px-5 py-5 flex flex-col items-center justify-between cursor-pointer h-60" onClick={() => clickHandler(props)}>
        <img src={imageUrl} alt={title} className="w-6/12 mb-4 rounded-md" />
        <h6 className="font-semibold mb-2 text-indigo-900">{title}</h6>
    </div>
  );
}
