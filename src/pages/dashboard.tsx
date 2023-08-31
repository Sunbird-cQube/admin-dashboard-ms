import DashboardCard from "@/components/dashboard-card";

const DashboardPage = () => {
  const cards = [
    {
        title: 'System monitoring',
        imageUrl: 'assets/images/performance.png',
        link: process.env.NEXT_PUBLIC_GRAFANA_URL
    },
    {
        title: 'Data debugger',
        imageUrl: 'assets/images/debugger.png',
        link: '/admin/debugger'
    },
    {
        title: 'Schema generator',
        imageUrl: 'assets/images/schema_creation.png',
        link: '/admin/debugger'
    },
  ];

  const clickHandler = (data: any) => {
    window.open(data.link)
  }

  return (
    <div className="grid grid-cols-12 gap-10">
        {cards.map(card => (
          <div key={card.title} className="col-span-3">
            <DashboardCard {...card} clickHandler={clickHandler}></DashboardCard>
          </div>
        ))}
    </div>
  );
};

export default DashboardPage;
