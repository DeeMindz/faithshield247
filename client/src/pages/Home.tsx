/* Redirect root to Landing */
import { Redirect } from "wouter";
export default function Home() {
  return <Redirect to="/" replace />;
}
