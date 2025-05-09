"use client";

import React, { useState } from "react";
import { useCompanyContactQueries } from "../hooks/useCompanyContactQueries";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const defaultQueryParams = {
  limit: 10,
  offset: 0,
};

export default function ListCompanyContacts() {
  const [inputId, setInputId] = useState("");
  const [searchId, setSearchId] = useState("");

  const [inputCompanyId, setInputCompanyId] = useState("");
  const [searchCompanyId, setSearchCompanyId] = useState("");

  const [inputUserId, setInputUserId] = useState("");
  const [searchUserId, setSearchUserId] = useState("");

  const [inputProfileId, setInputProfileId] = useState("");
  const [searchProfileId, setSearchProfileId] = useState("");

  const {
    useAllCompanyContacts,
    useCompanyContactById,
    useDeletedCompanyContacts,
    useCompanyContactsByCompanyId,
    useDeletedCompanyContactsByCompanyId,
    useCompanyContactsByUserId,
    useCompanyContactsByProfileId,
  } = useCompanyContactQueries();

  const {
    data: allContacts,
    isLoading: loadingAll,
    isError: errorAll,
  } = useAllCompanyContacts(defaultQueryParams);

  const {
    data: deletedContacts,
    isLoading: loadingDeleted,
    isError: errorDeleted,
  } = useDeletedCompanyContacts(defaultQueryParams);

  const {
    data: singleContact,
    isLoading: loadingSingle,
    isError: errorSingle,
  } = useCompanyContactById({ id: searchId });

  const {
    data: contactsByCompany,
    isLoading: loadingByCompany,
    isError: errorByCompany,
  } = useCompanyContactsByCompanyId({
    companyId: searchCompanyId,
    ...defaultQueryParams,
  });

  const {
    data: deletedContactsByCompany,
    isLoading: loadingDeletedByCompany,
    isError: errorDeletedByCompany,
  } = useDeletedCompanyContactsByCompanyId({
    companyId: searchCompanyId,
    ...defaultQueryParams,
  });

  const {
    data: contactsByUser,
    isLoading: loadingByUser,
    isError: errorByUser,
  } = useCompanyContactsByUserId({
    userId: searchUserId,
    ...defaultQueryParams,
  });

  const {
    data: contactsByProfile,
    isLoading: loadingByProfile,
    isError: errorByProfile,
  } = useCompanyContactsByProfileId({
    profileId: searchProfileId,
    ...defaultQueryParams,
  });

  if (
    errorAll ||
    errorDeleted ||
    errorSingle ||
    errorByCompany ||
    errorDeletedByCompany ||
    errorByUser ||
    errorByProfile
  ) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load one or more contact lists. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* All Contacts */}
      <Card>
        <CardHeader>
          <CardTitle>All Company Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingAll ? (
            <div className="text-center py-4">Loading contacts...</div>
          ) : allContacts && allContacts.length > 0 ? (
            <ul className="space-y-3">
              {allContacts.map((contact) => (
                <li
                  key={contact.id}
                  className="flex justify-between border p-3 rounded"
                >
                  <div>
                    <p className="font-medium">Contact ID: {contact.id}</p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      <p>Company ID: {contact.companyId}</p>
                      {contact.userId && <p>User ID: {contact.userId}</p>}
                      {contact.profileId && (
                        <p>Profile ID: {contact.profileId}</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No company contacts found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deleted Contacts */}
      <Card>
        <CardHeader>
          <CardTitle>Deleted Company Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingDeleted ? (
            <div className="text-center py-4">Loading deleted contacts...</div>
          ) : deletedContacts && deletedContacts.length > 0 ? (
            <ul className="space-y-3">
              {deletedContacts.map((contact) => (
                <li key={contact.id} className="border p-3 rounded">
                  <p className="font-medium">Contact ID: {contact.id}</p>
                  <p className="text-xs text-muted-foreground">
                    Company ID: {contact.companyId}
                  </p>
                  <p className="text-xs text-red-500">Deleted</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No deleted contacts.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Single Contact by ID */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Details (by ID)</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchId(inputId.trim());
            }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter contact ID"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </div>

            {searchId ? (
              loadingSingle ? (
                <div className="text-center py-4">Loading…</div>
              ) : errorSingle ? (
                <div className="text-red-500 text-center py-4">
                  Failed to load contact.
                </div>
              ) : !singleContact ? (
                <div className="text-muted-foreground text-center py-4">
                  No contact found with that ID.
                </div>
              ) : (
                <div className="border p-4 rounded mt-4">
                  <p className="font-medium">Contact ID: {singleContact.id}</p>
                  <div className="mt-3 text-xs text-muted-foreground">
                    <p>Company ID: {singleContact.companyId}</p>
                    {singleContact.userId && (
                      <p>User ID: {singleContact.userId}</p>
                    )}
                    {singleContact.profileId && (
                      <p>Profile ID: {singleContact.profileId}</p>
                    )}
                    {singleContact.title && <p>Title: {singleContact.title}</p>}
                    {singleContact.department && (
                      <p>Department: {singleContact.department}</p>
                    )}
                    <p>
                      Primary Contact: {singleContact.isPrimary ? "Yes" : "No"}
                    </p>
                    <p>Engagement Level: {singleContact.engagementLevel}</p>
                    {singleContact.lastContactDate && (
                      <p>
                        Last Contact:{" "}
                        {new Date(
                          singleContact.lastContactDate
                        ).toLocaleDateString()}
                      </p>
                    )}
                    {singleContact.notes && <p>Notes: {singleContact.notes}</p>}
                    {singleContact.deletedAt && (
                      <p className="text-red-500">
                        Deleted at:{" "}
                        {new Date(singleContact.deletedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              )
            ) : null}
          </form>
        </CardContent>
      </Card>

      {/* Contacts by Company ID */}
      <Card>
        <CardHeader>
          <CardTitle>Contacts by Company</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchCompanyId(inputCompanyId.trim());
            }}
            className="flex gap-2"
          >
            <Input
              placeholder="Enter Company ID"
              value={inputCompanyId}
              onChange={(e) => setInputCompanyId(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </form>

          {searchCompanyId ? (
            <>
              {/* Active Contacts for Company */}
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Active Contacts</h3>
                {loadingByCompany ? (
                  <div className="text-center py-4">Loading…</div>
                ) : errorByCompany ? (
                  <div className="text-red-500 text-center py-4">
                    Failed to load contacts.
                  </div>
                ) : !contactsByCompany || contactsByCompany.length === 0 ? (
                  <div className="text-muted-foreground text-center py-4">
                    No active contacts found for company &quot;{searchCompanyId}
                    &quot;.
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {contactsByCompany.map((contact) => (
                      <li key={contact.id} className="border p-3 rounded">
                        <p className="font-medium">Contact ID: {contact.id}</p>
                        <div className="text-xs text-muted-foreground">
                          {contact.title && <p>Title: {contact.title}</p>}
                          {contact.department && (
                            <p>Department: {contact.department}</p>
                          )}
                          <p>Primary: {contact.isPrimary ? "Yes" : "No"}</p>
                          <p>Engagement: {contact.engagementLevel}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Deleted Contacts for Company */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Deleted Contacts</h3>
                {loadingDeletedByCompany ? (
                  <div className="text-center py-4">Loading…</div>
                ) : errorDeletedByCompany ? (
                  <div className="text-red-500 text-center py-4">
                    Failed to load deleted contacts.
                  </div>
                ) : !deletedContactsByCompany ||
                  deletedContactsByCompany.length === 0 ? (
                  <div className="text-muted-foreground text-center py-4">
                    No deleted contacts found for company &quot;
                    {searchCompanyId}&quot;.
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {deletedContactsByCompany.map((contact) => (
                      <li key={contact.id} className="border p-3 rounded">
                        <p className="font-medium">Contact ID: {contact.id}</p>
                        <div className="text-xs text-muted-foreground">
                          {contact.title && <p>Title: {contact.title}</p>}
                          {contact.department && (
                            <p>Department: {contact.department}</p>
                          )}
                          <p>Primary: {contact.isPrimary ? "Yes" : "No"}</p>
                        </div>
                        <p className="text-xs text-red-500">Deleted</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>

      {/* Contacts by User ID */}
      <Card>
        <CardHeader>
          <CardTitle>Contacts by User</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchUserId(inputUserId.trim());
            }}
            className="flex gap-2"
          >
            <Input
              placeholder="Enter User ID"
              value={inputUserId}
              onChange={(e) => setInputUserId(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </form>

          {searchUserId ? (
            loadingByUser ? (
              <div className="mt-4 text-center">Loading…</div>
            ) : errorByUser ? (
              <div className="mt-4 text-red-500 text-center">
                Failed to load contacts by user.
              </div>
            ) : !contactsByUser || contactsByUser.length === 0 ? (
              <div className="mt-4 text-muted-foreground text-center">
                No contacts found for user &quot;{searchUserId}&quot;.
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {contactsByUser.map((contact) => (
                  <li key={contact.id} className="border p-3 rounded">
                    <p className="font-medium">Contact ID: {contact.id}</p>
                    <p className="text-xs text-muted-foreground">
                      Company ID: {contact.companyId}
                    </p>
                    <div className="text-xs text-muted-foreground"></div>
                  </li>
                ))}
              </ul>
            )
          ) : null}
        </CardContent>
      </Card>

      {/* Contacts by Profile ID */}
      <Card>
        <CardHeader>
          <CardTitle>Contacts by Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchProfileId(inputProfileId.trim());
            }}
            className="flex gap-2"
          >
            <Input
              placeholder="Enter Profile ID"
              value={inputProfileId}
              onChange={(e) => setInputProfileId(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </form>

          {searchProfileId ? (
            loadingByProfile ? (
              <div className="mt-4 text-center">Loading…</div>
            ) : errorByProfile ? (
              <div className="mt-4 text-red-500 text-center">
                Failed to load contacts by profile.
              </div>
            ) : !contactsByProfile || contactsByProfile.length === 0 ? (
              <div className="mt-4 text-muted-foreground text-center">
                No contacts found for profile &quot;{searchProfileId}&quot;.
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {contactsByProfile.map((contact) => (
                  <li key={contact.id} className="border p-3 rounded">
                    <p className="font-medium">Contact ID: {contact.id}</p>
                    <p className="text-xs text-muted-foreground">
                      Company ID: {contact.companyId}
                    </p>
                    <div className="text-xs text-muted-foreground"></div>
                  </li>
                ))}
              </ul>
            )
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
