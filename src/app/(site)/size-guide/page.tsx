import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SizeGuidePage() {
  const sizeChart = [
    { size: "Small", usShoe: "4-6", euShoe: "35-37", ukShoe: "2-4" },
    { size: "Medium", usShoe: "6.5-9", euShoe: "38-41", ukShoe: "4.5-7" },
    { size: "Large", usShoe: "9.5-12", euShoe: "42-45", ukShoe: "7.5-10" },
    { size: "X-Large", usShoe: "12.5-15", euShoe: "46-49", ukShoe: "10.5-13" },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Size Guide</h1>
      <p className="mb-6">
        Finding the right size sock is crucial for comfort and fit. Use our size chart below to determine the best size for you based on your shoe size.
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sock Size</TableHead>
            <TableHead>US Shoe Size</TableHead>
            <TableHead>EU Shoe Size</TableHead>
            <TableHead>UK Shoe Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sizeChart.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{row.size}</TableCell>
              <TableCell>{row.usShoe}</TableCell>
              <TableCell>{row.euShoe}</TableCell>
              <TableCell>{row.ukShoe}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h2 className="text-2xl font-semibold mt-8 mb-4">How to Measure</h2>
      <p className="mb-4">
        To find your perfect sock size, measure your foot length from the back of your heel to the tip of your longest toe. Compare this measurement to the shoe sizes in our chart above.
      </p>
      <p className="mb-4">
        Remember, if you&apos;re between sizes, it&apos;s usually better to size up for a more comfortable fit.
      </p>
      <p>
        If you have any questions about sizing or need further assistance, please don&apos;t hesitate to <a href="/contact" className="text-primary hover:underline">contact us</a>.
      </p>
    </div>
  )
}