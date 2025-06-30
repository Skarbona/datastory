import { Dashboard } from '@/components/Dashboard';
import { getCountries } from '@/lib/actions';

export default async function Home() {
  const countries = await getCountries();
  return <Dashboard initialCountries={countries} />;
}
