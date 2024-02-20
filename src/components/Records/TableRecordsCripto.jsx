import { BadgeDelta } from "@tremor/react";
import { FormatDate, FormatMoney, CalTaxeCripto, CalEarningCripto, calcDeltaType } from "@/app/lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from '@tremor/react';
  import { ModalDelete } from "./ModalDelete";
  


export function TableRecordsCripto({recordsCripto, price}){
    const priceBTC = price[0]?.priceBTC
    const CellDataTable = (title)=>{
        return <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {title}
        </TableHeaderCell>
    }
    return(
        <div>
                 <Table className="mt-8">
        <TableHead>
          <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
            {CellDataTable('Criptomoneda')}
            {CellDataTable('Fecha de Compra')}
            {CellDataTable('Total Compra')}
            {CellDataTable('Total Cripto')}
            {CellDataTable('Valor Cripto')}
            {CellDataTable('Ganancias')}
            {CellDataTable('Tasa')}    
            {CellDataTable('Accion')}   
          </TableRow>
        </TableHead>
        <TableBody>
          {recordsCripto.map((item) => (
            <TableRow key={item.workspace}>
              <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {item.name}
              </TableCell>
              <TableCell>{FormatDate(item.investmentDate)}</TableCell>
              <TableCell>{FormatMoney(item.addition)}</TableCell>
              <TableCell>{item.amountCripto}</TableCell>
              <TableCell>{FormatMoney(item.price)}</TableCell>
              <TableCell>{ CalEarningCripto(item.addition, item.price, priceBTC)}</TableCell>
              <TableCell><BadgeDelta deltaType={calcDeltaType(CalTaxeCripto(item.price, priceBTC))}>{CalTaxeCripto(item.price, priceBTC)} %</BadgeDelta></TableCell>
              <TableCell>
                <ModalDelete
                  id={item.id}
                  collection="CRIPTO"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        </div>
    )
}