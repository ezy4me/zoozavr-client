import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { db } from "@/shared/db/schema";
import api from "@/shared/api";

export const useSync = () => {
  const syncProgress = useMutation({
    mutationFn: async (data: any) =>
      api.post("/user_material_progress/sync", data),
  });

  useEffect(() => {
    const handleOnline = async () => {
      const pendingItems = await db.user_material_progress
        .where("pendingSync")
        .equals(1)
        .toArray();

      if (pendingItems.length > 0) {
        try {
          await syncProgress.mutateAsync(pendingItems);

          await db.user_material_progress
            .where("id")
            .anyOf(pendingItems.map((i) => i.id!))
            .modify({ pendingSync: 0 });

          console.log("Синхронизация прогресса Zoozavr завершена! 🦖");
        } catch (e) {
          console.error("Ошибка при попытке синхронизации:", e);
        }
      }
    };

    window.addEventListener("online", handleOnline);
    if (navigator.onLine) handleOnline();

    return () => window.removeEventListener("online", handleOnline);
  }, [syncProgress]);
};