import { withCommonLayout } from "@/hoc";
import Link from "next/link";

function Home() {
  return (
    <div>
      Home
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}

export default withCommonLayout(Home);
