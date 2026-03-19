// src/test/useArtworks.test.js
import { test, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useArtworks } from "../hooks/useArtworks";

// API call mocked
vi.mock("../services/artService", () => ({
  getAllArtworks: vi.fn().mockResolvedValue([
    { _id: "1", title: "Starry Night", artist: "Van Gogh" },
    { _id: "2", title: "Mona Lisa", artist: "Da Vinci" },
  ]),
  deleteArtwork: vi.fn(),
}));

test("filtre les artworks par titre", async () => {
  const { result } = renderHook(() => useArtworks());

  await act(async () => {});

  // mock a search
  act(() => {
    result.current.setSearchTerm("starry");
  });

  expect(result.current.filteredArtworks).toHaveLength(1);
  expect(result.current.filteredArtworks[0].title).toBe("Starry Night");
});
