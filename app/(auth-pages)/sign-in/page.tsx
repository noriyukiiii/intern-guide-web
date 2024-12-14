import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "../../actions";

export default function page() {
  return (
    <main>
      <form action={register}>
        <div className="flex flex-col gap-2 items-center">
          <h1>Sign-up</h1>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="you@example.com" required />
          </div>
          <div>
            <Label htmlFor="password">password</Label>
            <Input name="password" placeholder="password" />
          </div>
          <div>
            <Label htmlFor="lastname">lastname</Label>
            <Input name="lastname" placeholder="lastname" />
          </div>
          <div>
            <Label htmlFor="firstname">firstname</Label>
            <Input name="firstname" placeholder="firstname" />
          </div>
          <div>
            <Label htmlFor="telephone">telephone</Label>
            <Input name="telephone" placeholder="telephone" />
          </div>
          <div>
            <Label htmlFor="student_id">student_id</Label>
            <Input name="student_id" placeholder="student_id" />
          </div>
          <button className="bg-green-500 rounded-md px-4 py-2 text-foreground ">
            Sign up
          </button>
        </div>
      </form>
    </main>
  );
}
