"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateClassApplicationAnswer } from "./components/CreateClassApplicationAnswer";
import { UpdateClassApplicationAnswer } from "./components/UpdateClassApplicationAnswer";
import { DeleteClassApplicationAnswer } from "./components/DeleteClassApplicationAnswer";
import { RestoreClassApplicationAnswer } from "./components/RestoreClassApplicationAnswer";
import { ListClassApplicationAnswer } from "./components/ListClassApplicationAnswer";

export default function ClassApplicationAnswerPage() {
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
                            <ListClassApplicationAnswer />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="create" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <CreateClassApplicationAnswer />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="update" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <UpdateClassApplicationAnswer />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="delete" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <DeleteClassApplicationAnswer />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="restore" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <RestoreClassApplicationAnswer />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
