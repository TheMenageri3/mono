"use client";

import React, { useState } from "react";
import { useCompanyQueries } from "../hooks/useCompanyQueries";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const defaultQueryParams = {
  limit: 10,
  offset: 0,
};

export default function ListCompanies() {
  const [inputId, setInputId] = useState("");
  const [searchId, setSearchId] = useState("");

  const [inputQuery, setInputQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [inputIndustry, setInputIndustry] = useState("");
  const [searchIndustry, setSearchIndustry] = useState("");

  const {
    useAllCompanies,
    useCompanyByIdInput,
    useDeletedCompaniesInput,
    useCompaniesByIndustryInput,
    useSearchCompaniesInput,
  } = useCompanyQueries();

  const {
    data: allCompanies,
    isLoading: loadingAll,
    isError: errorAll,
  } = useAllCompanies(defaultQueryParams);

  const {
    data: deletedCompanies,
    isLoading: loadingDeleted,
    isError: errorDeleted,
  } = useDeletedCompaniesInput(defaultQueryParams);

  const {
    data: singleCompany,
    isLoading: loadingSingle,
    isError: errorSingle,
  } = useCompanyByIdInput({ id: searchId });

  const {
    data: companiesByIndustry,
    isLoading: loadingByIndustry,
    isError: errorByIndustry,
  } = useCompaniesByIndustryInput({
    industry: searchIndustry,
    ...defaultQueryParams,
  });

  const {
    data: searchResults,
    isLoading: loadingSearch,
    isError: errorSearch,
  } = useSearchCompaniesInput({
    query: searchQuery,
    ...defaultQueryParams,
  });

  if (
    errorAll ||
    errorDeleted ||
    errorSingle ||
    errorByIndustry ||
    errorSearch
  ) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load one or more company lists. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* All Companies */}
      <Card>
        <CardHeader>
          <CardTitle>All Companies</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingAll ? (
            <div className="text-center py-4">Loading companies...</div>
          ) : allCompanies && allCompanies.length > 0 ? (
            <ul className="space-y-3">
              {allCompanies.map((company) => (
                <li
                  key={company.id}
                  className="flex justify-between border p-3 rounded"
                >
                  <div>
                    <p className="font-medium">Name: {company.name}</p>
                    <p className="text-sm">
                      {company.description && company.description.length > 100
                        ? `${company.description.substring(0, 100)}...`
                        : company.description}
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      <p>Location: {company.headquarters}</p>
                      {company.website && (
                        <p>
                          Website:{" "}
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            {company.website}
                          </a>
                        </p>
                      )}
                      <p>Status: {company.active ? "Active" : "Inactive"}</p>
                      <p>ID: {company.id}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No companies found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deleted Companies */}
      <Card>
        <CardHeader>
          <CardTitle>Deleted Companies</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingDeleted ? (
            <div className="text-center py-4">Loading deleted companies...</div>
          ) : deletedCompanies && deletedCompanies.length > 0 ? (
            <ul className="space-y-3">
              {deletedCompanies.map((company) => (
                <li key={company.id} className="border p-3 rounded">
                  <p className="font-medium">Name: {company.name}</p>
                  <p className="text-xs text-muted-foreground">Deleted</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No deleted companies.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Single Company by ID */}
      <Card>
        <CardHeader>
          <CardTitle>Company Details (by ID)</CardTitle>
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
                placeholder="Enter company ID"
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
                  Failed to load company.
                </div>
              ) : !singleCompany ? (
                <div className="text-muted-foreground text-center py-4">
                  No company found with that ID.
                </div>
              ) : (
                <div className="border p-4 rounded mt-4">
                  <p className="font-medium">Name: {singleCompany.name}</p>
                  {singleCompany.description && (
                    <p className="mt-2 text-sm">{singleCompany.description}</p>
                  )}
                  <div className="mt-3 text-xs text-muted-foreground">
                    <p>Location: {singleCompany.headquarters}</p>
                    {singleCompany.website && (
                      <p>
                        Website:{" "}
                        <a
                          href={singleCompany.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          {singleCompany.website}
                        </a>
                      </p>
                    )}
                    <p>
                      Status: {singleCompany.active ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
              )
            ) : null}
          </form>
        </CardContent>
      </Card>

      {/* Search Companies */}
      <Card>
        <CardHeader>
          <CardTitle>Search Companies</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchQuery(inputQuery.trim());
            }}
            className="flex gap-2"
          >
            <Input
              placeholder="Search companies by name, description, or location"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </form>

          {searchQuery ? (
            loadingSearch ? (
              <div className="mt-4 text-center">Loading…</div>
            ) : errorSearch ? (
              <div className="mt-4 text-red-500 text-center">
                Failed to search companies.
              </div>
            ) : !searchResults || searchResults.length === 0 ? (
              <div className="mt-4 text-muted-foreground text-center">
                No companies found matching &quot;{searchQuery}&quot;.
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {searchResults.map((company) => (
                  <li key={company.id} className="border p-3 rounded">
                    <p className="font-medium">Name: {company.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Location: {company.headquarters}
                    </p>
                  </li>
                ))}
              </ul>
            )
          ) : null}
        </CardContent>
      </Card>

      {/* Companies by Industry */}
      <Card>
        <CardHeader>
          <CardTitle>Companies by Industry</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchIndustry(inputIndustry.trim());
            }}
            className="flex gap-2"
          >
            <Input
              placeholder="Enter industry tag name"
              value={inputIndustry}
              onChange={(e) => setInputIndustry(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </form>

          {searchIndustry ? (
            loadingByIndustry ? (
              <div className="mt-4 text-center">Loading…</div>
            ) : errorByIndustry ? (
              <div className="mt-4 text-red-500 text-center">
                Failed to load companies by industry.
              </div>
            ) : !companiesByIndustry || companiesByIndustry.length === 0 ? (
              <div className="mt-4 text-muted-foreground text-center">
                No companies found in the industry &quot;{searchIndustry}&quot;.
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {companiesByIndustry.map((company) => (
                  <li key={company.id} className="border p-3 rounded">
                    <p className="font-medium">Name: {company.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Location: {company.headquarters}
                    </p>
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
