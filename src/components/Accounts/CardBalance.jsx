import { BadgeDelta, Card,  Flex,  Metric,  Tab, TabGroup, TabList, TabPanel, TabPanels, Text } from "@tremor/react"
import { Records } from "@/components/Records"
import { getRecordsForAccounts } from "@/app/lib/actions"
import { FormatMoney } from "@/app/lib/utils"

export async function CardBalance(props){

    const data = await getRecordsForAccounts(props.id)
    let total = 0
    let Earnings = 0

    function calTotalInvesment(data){
      {data.map(item =>{
        total += item.addition
        Earnings += item.investmentEarnings 
      })}
    }

    calTotalInvesment(data)

    return(
        <Card className="w-full">
              <TabGroup>
                      <TabList>
                          <Tab>Saldo</Tab>
                          <Tab>Registros</Tab>
                      </TabList>          
                  <TabPanels>
                      <TabPanel>
                        <Card className="max-w-lg mx-auto" decoration="top" decorationColor={props.color}>
                         <BadgeDelta className="right-5 top-2 absolute" deltaType="moderateIncrease">{((Earnings/total)*100/1).toFixed(2)}</BadgeDelta>
                          <Flex alignItems="start" className="gap-1 flex-wrap">
                            <div>
                             <Text className="mb-2">Inversión</Text>
                             <Metric>{FormatMoney(total)}</Metric>
                            </div>
                            <div>
                              <Text className="mb-2">Ganancias</Text>
                              <Metric>{FormatMoney(Earnings)}</Metric>
                            </div>  
                          </Flex>                  
                        </Card>
                      </TabPanel>
                      <TabPanel className="mb-3">
                          <Records/>
                      </TabPanel>
                  </TabPanels>
              </TabGroup>
              </Card>   
    )
}