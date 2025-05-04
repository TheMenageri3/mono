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

const deleteWalletSchema = z.object({
  publicKey: z.string().min(1, "Public key is required"),
});

type DeleteWalletInput = z.infer<typeof deleteWalletSchema>;

export function DeleteWallet() {
  const { useDeleteWallet } = useWalletMutations();
  const { deleteWallet, isPending } = useDeleteWallet();

  const form = useForm<DeleteWalletInput>({
    resolver: zodResolver(deleteWalletSchema),
    defaultValues: {
      publicKey: "",
    },
  });

  const onSubmit = (data: DeleteWalletInput) => {
    deleteWallet(data);
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
                <Input {...field} placeholder="Enter public key to delete" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="destructive" disabled={isPending}>
          {isPending ? "Deleting..." : "Delete Wallet"}
        </Button>
      </form>
    </Form>
  );
}
