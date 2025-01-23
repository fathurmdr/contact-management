import { useState } from "react";

export type DialCode = {
  name: string;
  dial_code: string;
  code: string;
};

export default function useData() {
  const [dialCodes, setDialCodes] = useState<DialCode[]>([]);

  async function getDialCodes() {
    const res = await fetch("/data/dial-codes.json");

    if (res.ok) {
      const data = await res.json();

      data.sort((a: DialCode, b: DialCode) =>
        a.dial_code.localeCompare(b.dial_code),
      );

      setDialCodes(data);
    }
  }
  return {
    dialCodes,
    getDialCodes,
  };
}
