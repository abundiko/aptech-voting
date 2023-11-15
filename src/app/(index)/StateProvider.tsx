"use client";
import { store } from "@/state/store";
import { Theme } from "@radix-ui/themes";
import { Provider } from "react-redux";
import "@radix-ui/themes/styles.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function StateProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <body className={inter.className}>
      <Provider store={store}>
        <Theme accentColor="red">
          {children}
        </Theme>
      </Provider>
    </body>
  );
}
