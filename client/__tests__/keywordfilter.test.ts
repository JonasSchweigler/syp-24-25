import { mockData } from "../mock_data"; // Adjust this import based on where your mockData is located

describe("YouTube Search Response Tests", () => {
  test('should filter items that include the keyword "mrbeast" in title or description', () => {
    const keyword = "mrbeast";
    const filteredResults = mockData.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword)
    );

    expect(filteredResults).toHaveLength(4);
    expect(filteredResults).toEqual([
      {
        title: "MrBeast verschenkt ein Haus",
        description: "Krasse Challenge für einen Fan",
      },
      {
        title: "MrBeast baut einen Vergnügungspark",
        description: "Größtes DIY-Projekt ever",
      },
      {
        title: "MrBeast spendet 100.000 Mahlzeiten",
        description: "Große Aktion für Bedürftige",
      },
      {
        title: "MrBeast versteckt 100.000 Dollar",
        description: "Die ultimative Schatzsuche",
      },
    ]);
  });

  test('should filter items that do not include the keyword "mrbeast" in title or description', () => {
    const keyword = "mrbeast";
    const filteredResults = mockData.filter(
      (item) =>
        !item.title.toLowerCase().includes(keyword) &&
        !item.description.toLowerCase().includes(keyword)
    );

    expect(filteredResults).toHaveLength(46);
    expect(filteredResults).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: expect.stringMatching(/mrbeast/i) }),
        expect.objectContaining({
          description: expect.stringMatching(/mrbeast/i),
        }),
      ])
    );
  });

  test('should filter items with keywords "mrbeast" or "minecraft" in title or description', () => {
    const keywords = ["mrbeast", "minecraft"];
    const filteredResults = mockData.filter((item) =>
      keywords.some(
        (keyword) =>
          item.title.toLowerCase().includes(keyword) ||
          item.description.toLowerCase().includes(keyword)
      )
    );

    expect(filteredResults).toHaveLength(7); // Adjust based on the data
  });
});
