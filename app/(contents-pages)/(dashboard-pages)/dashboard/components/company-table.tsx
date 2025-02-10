import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";

export default function CompanyTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Test</TableHead>
          <TableHead>Test</TableHead>
          <TableHead>Test</TableHead>
          <TableHead>Test</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
            <TableCell>
                test
            </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
