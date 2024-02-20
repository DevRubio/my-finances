import { AccordionBody, AccordionHeader, AccordionList, Accordion } from "@tremor/react"
import { getRecords, getConfig } from "@/app/lib/actions"
import { TableRecordsCripto } from "./TableRecordsCripto"
import { TableRecordsCDTS } from "./TableRecordsCDTS"
import { TableRecordsFICS } from "./TableRecordsFICS"

export async function Records(){
    const recordsCripto = await getRecords('CRIPTO')
    const price = await getConfig('priceCripto')  
    const recordsCDTS = await getRecords('CDTS')
    const recordsFIC = await getRecords('FICS')

    return(
        <AccordionList className="mx-auto">
            <Accordion>
                <AccordionHeader>CRIPTO</AccordionHeader>
                <AccordionBody>
                <TableRecordsCripto 
                recordsCripto={recordsCripto}
                price={price}
             />
                </AccordionBody>
            </Accordion>
            <Accordion>
                <AccordionHeader>CDTS</AccordionHeader>
                <AccordionBody>
                <TableRecordsCDTS
                    recordsCDTS={recordsCDTS}
                />
                </AccordionBody>
            </Accordion>
            <Accordion>
                <AccordionHeader>FICS</AccordionHeader>
                <AccordionBody>
                    <TableRecordsFICS
                        recordsFIC={recordsFIC}
                    />
                </AccordionBody>
            </Accordion>
        </AccordionList>
    )
}