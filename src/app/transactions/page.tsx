import { DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BackButton } from '@/components/back-button';

const transactions = [
  { id: 'TRX001', date: '2024-07-20', item: 'Pashmina Shawl', amount: '₹4,500.00', status: 'Completed' },
  { id: 'TRX002', date: '2024-07-19', item: 'Terracotta Vase', amount: '₹1,200.00', status: 'Completed' },
  { id: 'TRX003', date: '2024-07-18', item: 'Madhubani Painting', amount: '₹8,000.00', status: 'Pending' },
  { id: 'TRX004', date: '2024-07-15', item: 'Wooden Elephant Statue', amount: '₹2,500.00', status: 'Completed' },
  { id: 'TRX005', date: '2024-07-12', item: 'Blue Pottery Mug Set', amount: '₹950.00', status: 'Failed' },
];

export default function TransactionsPage() {
  return (
    <div className="p-6">
      <BackButton />
      <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                 <DollarSign className="w-8 h-8 text-primary" />
                <CardTitle className="font-headline text-3xl">Transactions</CardTitle>
            </div>
          <CardDescription>
            A secure and transparent record of all your sales and earnings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((trx) => (
                <TableRow key={trx.id}>
                  <TableCell className="font-medium">{trx.id}</TableCell>
                  <TableCell>{trx.date}</TableCell>
                  <TableCell>{trx.item}</TableCell>
                  <TableCell>{trx.amount}</TableCell>
                  <TableCell>
                    <Badge variant={
                      trx.status === 'Completed' ? 'default' : trx.status === 'Pending' ? 'secondary' : 'destructive'
                    }>
                      {trx.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
