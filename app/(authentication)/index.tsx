import { Redirect } from "expo-router";

export default function AuthIndex() {
  // immediately redirect to login page
  return <Redirect href="/login" />;
}