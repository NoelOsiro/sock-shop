export const filterSections = [
    {
      id: 'price',
      title: 'Price',
      type: 'range' as const,
      range: {
        min: 100,
        max: 250,
        step: 10,
      },
    },
    {
      id: 'size',
      title: 'Size',
      type: 'checkbox' as const,
      options: [
        { id: 'S', label: 'Small' },
        { id: 'M', label: 'Medium' },
        { id: 'L', label: 'Large' },
        { id: 'XL', label: 'X-Large' },
      ],
    },
    {
      id: 'color',
      title: 'Color',
      type: 'checkbox' as const,
      options: [
        { id: 'Black', label: 'Black' },
        { id: 'white', label: 'White' },
        { id: 'gray', label: 'Gray' },
        { id: 'blue', label: 'Blue' },
        { id: 'red', label: 'Red' },
      ],
    },
    {
      id: 'type',
      title: 'Type',
      type: 'checkbox' as const,
      options: [
        { id: 'crew', label: 'Crew' },
        { id: 'ankle', label: 'Ankle' },
        { id: 'no-show', label: 'No Show' },
        { id: 'knee-high', label: 'Knee High' },
      ],
    },
    {
      id: 'material',
      title: 'Material',
      type: 'checkbox' as const,
      options: [
        { id: 'cotton', label: 'Cotton' },
        { id: 'wool', label: 'Wool' },
        { id: 'polyester', label: 'Polyester' },
        { id: 'bamboo', label: 'Bamboo' },
      ],
    },
  ]