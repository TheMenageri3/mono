"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useWalletMutations } from "../hooks/useWalletMutations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const restoreWalletSchema = z.object({
  publicKey: z.string().min(1, "Public key is required"),
});

type RestoreWalletInput = z.infer<typeof restoreWalletSchema>;

export function RestoreWallet() {
  const { useRestoreWallet } = useWalletMutations();
  const { restoreWallet, isPending } = useRestoreWallet();

  const form = useForm<RestoreWalletInput>({
    resolver: zodResolver(restoreWalletSchema),
    defaultValues: {
      publicKey: "",
    },
  });

  const onSubmit = (data: RestoreWalletInput) => {
    restoreWallet(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-lg mx-auto py-8"
      >
        <FormField
          control={form.control}
          name="publicKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Public Key</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter public key to restore" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Restoring..." : "Restore Wallet"}
        </Button>
      </form>
    </Form>
  );
}
