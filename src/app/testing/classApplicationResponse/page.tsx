"use client";

import React, { useState } from "react";
import { CreateClassApplicationResponse } from "./components/CreateClassApplicationResponse";
import { UpdateClassApplicationResponse } from "./components/UpdateClassApplicationResponse";
import { DeleteClassApplicationResponse } from "./components/DeleteClassApplicationResponse";
import { RestoreClassApplicationResponse } from "./components/RestoreClassApplicationResponse";
import { ListClassApplicationResponse } from "./components/ListClassApplicationResponse";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ClassApplicationResponsePage() {
    const [activeTab, setActiveTab] = useState("list");

    return (
        <div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-5 mb-8">
                    <TabsTrigger value="list">List Responses</TabsTrigger>
                    <TabsTrigger value="create">Create Response</TabsTrigger>
                    <TabsTrigger value="update">Update Response</TabsTrigger>
                    <TabsTrigger value="delete">Delete Response</TabsTrigger>
                    <TabsTrigger value="restore">Restore Response</TabsTrigger>
                </TabsList>

                <TabsContent value="list" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <ListClassApplicationResponse />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="create" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <CreateClassApplicationResponse />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="update" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <UpdateClassApplicationResponse />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="delete" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <DeleteClassApplicationResponse />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="restore" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <RestoreClassApplicationResponse />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
