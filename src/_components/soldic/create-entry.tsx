import { useRouter } from "next/navigation";
import { useState } from "react";
import { Entry, EntrySearchResult } from "~/server/api/routers/entry/read";
import { Tag } from "~/server/api/routers/tag/read";

import { api } from "~/trpc/react";
import { ExternalLink } from "~/types";
import { cn, getContrastedHexColor, getRandomColor } from "~/utils";

export function CreateEntry() {
  const router = useRouter();
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [links, setLinks] = useState<ExternalLink[]>([]);
  const [tagSearchTerm, setTagSearchTerm] = useState("");
  const [entrySearchTerm, setEntrySearchTerm] = useState("");
  const [acronym, setAcronym] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [relations, setRelations] = useState<EntrySearchResult[]>([]);
  const [longDefinition, setLongDefinition] = useState("");

  const createEntry = api.entry.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setTerm("");
      setDefinition("");
      setLinks([]);
      setTags([]);
      setLongDefinition("");
    },
  });

  const { data: tagSearchResults } = api.tag.search.useQuery(
    { query: tagSearchTerm },
    {
      enabled: !!tagSearchTerm,
    },
  );

  const { data: entrySearchResults } = api.entry.search.useQuery(
    { query: entrySearchTerm },
    {
      enabled: !!entrySearchTerm,
    },
  );

  const createTag = api.tag.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const createEntryComponent = (entry: Entry) => {
    return (
      <div
        className={cn("flex justify-between", `border-1 border-solid`)}
        key={entry.id}
      >
        {entry.term}{" "}
        <button
          onClick={(e) => {
            e.preventDefault();
            setRelations([...relations, entry]);
            setEntrySearchTerm("");
          }}
        >
          Add
        </button>
      </div>
    );
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createEntry.mutate({
          term,
          definition,
          links,
          tags: tags.length === 0 ? undefined : tags.map((tag) => tag.id),
          longDefinition,
          relatedTo: relations.map((relation) => relation.id),
          relatedFrom: relations.map((relation) => relation.id),
          acronym,
        });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Term"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-full rounded-md border border-solid border-black p-4 text-black"
      />
      <input
        type="text"
        placeholder="Acronym"
        value={acronym}
        onChange={(e) => setAcronym(e.target.value)}
        className="w-full rounded-md border border-solid border-black p-4 text-black"
      />
      <textarea
        placeholder="Definition"
        value={definition}
        onChange={(e) => setDefinition(e.target.value)}
        className="w-full rounded-md border border-solid border-black p-4 text-black"
      />
      <textarea
        placeholder="Long Definition"
        value={longDefinition}
        onChange={(e) => setLongDefinition(e.target.value)}
        className="w-full rounded-md border border-solid border-black p-4 text-black"
      />
      <div>
        <div>Links</div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setLinks([...links, { url: "", title: "" }]);
          }}
        >
          Add Link
        </button>
        {links.map((link, index) => (
          <div key={index} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="URL"
              value={link.url}
              onChange={(e) => {
                const newLinks = [...links];
                if (newLinks && !!newLinks[index]) {
                  newLinks[index].url = e.target.value;
                }
                setLinks(newLinks);
              }}
            />
            <input
              type="text"
              placeholder="Title"
              value={link.title}
              onChange={(e) => {
                const newLinks = [...links];
                if (newLinks && !!newLinks[index]) {
                  newLinks[index].title = e.target.value;
                }
                setLinks(newLinks);
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setLinks(links.filter((_, i) => i !== index));
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <h1>Tags</h1>
        <div className="flex flex-col gap-2">
          {tags.map((tag, index) => (
            <div
              key={tag.id}
              className={cn("flex justify-between", `border-4 border-solid`)}
              style={{ borderColor: tag.color }}
            >
              {tag.name}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setTags(tags.filter((_, i) => i !== index));
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        {tagSearchTerm !== "" && (
          <button
            onClick={(e) => {
              e.preventDefault();
              createTag.mutate(
                { name: tagSearchTerm, color: getContrastedHexColor() },
                {},
              );
            }}
            disabled={
              !tagSearchTerm ||
              tagSearchResults?.some((tag) => tag.name === tagSearchTerm)
            }
            className="rounded-md border border-black bg-white/20 px-10 py-3 font-semibold transition hover:bg-white/20"
          >
            Create Tag &quot;{tagSearchTerm}&quot;
          </button>
        )}
        <input
          type="text"
          placeholder="Tag Search"
          value={tagSearchTerm}
          onChange={(e) => setTagSearchTerm(e.target.value)}
        />
        {tagSearchResults?.map((tag) => (
          <div
            className={cn("flex justify-between", `border-4 border-solid`)}
            style={{ borderColor: tag.color }}
            key={tag.id}
          >
            {tag.name}{" "}
            <button
              onClick={(e) => {
                e.preventDefault();
                setTags([...tags, tag as unknown as Tag]);
                setTagSearchTerm("");
              }}
            >
              Add
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <h1>Related Terms</h1>
        <div className="flex flex-col gap-2">
          {relations.map((relation, index) => (
            <div
              key={relation.id}
              className={cn("flex justify-between", `border-1 border-solid`)}
            >
              {relation.term}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setRelations(relations.filter((_, i) => i !== index));
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search Related Terms"
          value={entrySearchTerm}
          onChange={(e) => setEntrySearchTerm(e.target.value)}
        />
        {/* @ts-expect-error: This error is irrelevant and wrong */}
        {entrySearchResults?.map((entry) => createEntryComponent(entry))}
      </div>
      <button
        type="submit"
        className="rounded-md border border-black bg-white/20 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={
          createEntry.isPending || !term || !definition || !longDefinition
        }
      >
        {createEntry.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
