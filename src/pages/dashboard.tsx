import DashboardCard from "@/components/dashboard-card";
import { useRouter } from "next/router";

const DashboardPage = () => {
  const router = useRouter();

  const cards = [
    {
        title: 'System monitoring',
        imageUrl: 'assets/images/performance.png',
        link: process.env.NEXT_PUBLIC_GRAFANA_URL,
        openInNewtab: true
    },
    {
        title: 'Data debugger',
        imageUrl: 'assets/images/debugger.png',
        link: '/debugger'
    },
    {
        title: 'Schema generator',
        imageUrl: 'assets/images/schema_creation.png',
        link: '/debugger'
    },
  ];

  const clickHandler = (data: any) => {
    if (data.openInNewtab) {
      window.open(data.link)
    } else {
      router.push(data.link);
    }
  }

  return (
    <div className="grid grid-cols-12 gap-10">
        {cards.map((card, ind) => (
          <div key={card.title} className="col-span-3">
            <DashboardCard id={`dashboardCard${ind}`} {...card} clickHandler={clickHandler}></DashboardCard>
          </div>
        ))}
    </div>
  );
};

export default DashboardPage;
