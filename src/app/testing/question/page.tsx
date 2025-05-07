"use client";

import React, { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateQuestion } from "./components/CreateQuestion";
import { ListQuestion } from "./components/ListQuestion";
import { UpdateQuestion } from "./components/UpdateQuestion";
import { DeleteQuestion } from "./components/DeleteQuestion";
import { RestoreQuestion } from "./components/RestoreQuestion";

export default function QuestionPage() {
    const [activeTab, setActiveTab] = useState("list");

    return (
        <div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-5 mb-8">
                    <TabsTrigger value="list">List Questions</TabsTrigger>
                    <TabsTrigger value="create">Create Question</TabsTrigger>
                    <TabsTrigger value="update">Update Question</TabsTrigger>
                    <TabsTrigger value="delete">Delete Question</TabsTrigger>
                    <TabsTrigger value="restore">Restore Question</TabsTrigger>
                </TabsList>

                <TabsContent value="list" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <ListQuestion />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="create" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <CreateQuestion />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="update" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <UpdateQuestion />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="delete" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <DeleteQuestion />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="restore" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <RestoreQuestion />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
