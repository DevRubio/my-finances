import { BadgeDelta, Table, TableBody, TableCell, TableHead, TableRow, TableHeaderCell } from "@tremor/react";
import { FormatDate, FormatMoney, CalculateMonths, CalTaxe, calcDeltaType, CalEarning } from "@/app/lib/utils";
import { ModalDelete } from "./ModalDelete";
import { Timestamp } from "firebase/firestore";
import { PencilIcon } from "@heroicons/react/outline";
import Link from "next/link";

export function TableRecordsFICS({recordsFIC}){

        const CellDataTable = (title)=>{
        return <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {title}
        </TableHeaderCell>
    }
    return(
        <Table>
            <TableHead>
                <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                    {CellDataTable('Fecha')}
                    {CellDataTable('Nombre')}
                    {CellDataTable('Capital Invertido')}
                    {CellDataTable('Tiempo')}
                    {CellDataTable('Ganancias')}
                    {CellDataTable('Tasa')}
                    {CellDataTable('Accion')}
                </TableRow>
            </TableHead>
            <TableBody>
                {recordsFIC.map((item)=>(
                    <TableRow key={item.id}>
                        <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            {FormatDate(item.investmentDate)}
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{FormatMoney(item.addition)}</TableCell>
                        <TableCell>{CalculateMonths(item.investmentDate, item.earningsDate ? item.earningsDate : Timestamp.fromMillis(Date.now()))} Meses</TableCell>
                        <TableCell>{CalEarning(item.finalBalance, item.addition)}</TableCell>
                        <TableCell><BadgeDelta deltaType={calcDeltaType(CalTaxe(item.addition, item.finalBalance))}>{CalTaxe(item.addition, item.finalBalance)} %</BadgeDelta></TableCell>
                        <TableCell className="flex">
                            <ModalDelete
                            id={item.id}
                            collection="FICS"
                            />
                            <Link href={`/records/edit/FICS/${item.id}`}>
                                 <PencilIcon className="w-6 hover:w-8 hover:text-yellow-500 hover:cursor-pointer"/>                            
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
