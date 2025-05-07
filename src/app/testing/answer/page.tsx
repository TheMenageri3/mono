"use client";

import React, { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateAnswer } from "./components/CreateAnswer";
import { ListAnswer } from "./components/ListAnswer";
import { UpdateAnswer } from "./components/UpdateAnswer";
import { DeleteAnswer } from "./components/DeleteAnswer";
import { RestoreAnswer } from "./components/RestoreAnswer";

export default function AnswerPage() {
    const [activeTab, setActiveTab] = useState("list");

    return (
        <div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-5 mb-8">
                    <TabsTrigger value="list">List Answers</TabsTrigger>
                    <TabsTrigger value="create">Create Answer</TabsTrigger>
                    <TabsTrigger value="update">Update Answer</TabsTrigger>
                    <TabsTrigger value="delete">Delete Answer</TabsTrigger>
                    <TabsTrigger value="restore">Restore Answer</TabsTrigger>
                </TabsList>

                <TabsContent value="list" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <ListAnswer />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="create" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <CreateAnswer />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="update" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <UpdateAnswer />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="delete" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <DeleteAnswer />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="restore" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <RestoreAnswer />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
