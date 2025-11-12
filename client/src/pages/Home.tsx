import { CustomButton } from "../features/buttons/button";
import { Flex } from "@radix-ui/themes";
import "../assets/styles/home.css";
import { useState } from "react";
import { getHealth } from "../services/api";

export default function Home() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTestApi = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await getHealth();
      setResult(response.data);
    } catch (err: any) {
      setError("Impossible de joindre l’API");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Flex align="center" justify="center" className="home-bg">
      <Flex direction="column" align="center" justify="center" gap="4" className="home-card">
        <h1>Tester c'est douter :</h1>
        <CustomButton onClick={handleTestApi} disabled={loading}>
          {loading ? "Test en cours..." : "Tester la connexion"}
        </CustomButton>
        {result && (
          <div className="mt-4 bg-gray-100 p-4 rounded text-center">
            <p>
              <strong>Statut :</strong> {result.status}
            </p>
            <p>
              <strong>Message :</strong> {result.message}
            </p>
          </div>
        )}
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </Flex>
    </Flex>
  );
}
