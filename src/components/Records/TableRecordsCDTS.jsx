
import { BadgeDelta, Table, TableBody, TableCell, TableHead, TableRow, TableHeaderCell } from "@tremor/react";
import { FormatDate, FormatMoney, CalculateMonths, CalTaxe, calcDeltaType, CalEarning } from "@/app/lib/utils";
import { Timestamp } from "firebase/firestore";
import { ModalDelete } from "./ModalDelete";
import { PencilIcon } from "@heroicons/react/outline"
import Link from "next/link";

export function TableRecordsCDTS({recordsCDTS}){

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
                    {CellDataTable('Capital inicial o addiccion')}
                    {CellDataTable('Reinversion')}
                    {CellDataTable('Tiempo')}
                    {CellDataTable('Ganancias')}
                    {CellDataTable('Tasa')}
                    {CellDataTable('Accion')}
                </TableRow>
            </TableHead>
            <TableBody>
                {recordsCDTS.map((item)=>(
                    <TableRow key={item.id}>
                        <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            {FormatDate(item.investmentDate)}
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{FormatMoney(item.addition)}</TableCell>
                        <TableCell>{FormatMoney(item.reinvestment)}</TableCell>
                        <TableCell>{CalculateMonths(item.investmentDate, item.earningsDate ? item.earningsDate : Timestamp.fromMillis(Date.now()))} Meses</TableCell>
                        <TableCell>{CalEarning(item.finalBalance, (item.addition + item.reinvestment))}</TableCell>
                        <TableCell><BadgeDelta deltaType={calcDeltaType(CalTaxe(item.addition + item.reinvestment, item.finalBalance))}>{CalTaxe(item.addition + item.reinvestment, item.finalBalance)} %</BadgeDelta></TableCell>
                        <TableCell className="flex">
                            <ModalDelete
                                id={item.id}
                                collection="CDTS"
                            />
                            
                            <Link href={`/records/edit/CDTS/${item.id}`}>
                            <PencilIcon
                                className="w-6 hover:w-8 hover:text-yellow-500 hover:cursor-pointer"
                            />                            
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
