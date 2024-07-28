'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
    Form
} from "@/components/ui/form"
import CustomInput from "./CustomInput"
import CustomSelect from "./CustomSelect"
import { CountryList, Percentage, SelectBoolean } from "@/cosntants/contants"
import { CustomDate } from "./CustomDate"
import { addEnquiry, updateEnquiry } from "@/lib/services/api"
import { format, parse } from "date-fns"
import { useToast } from "./ui/use-toast"
import { useEffect } from "react"

const formSchema = z.object({
    client: z.string().min(1, { message: "Client name is required" }),
    end_user: z.string().min(1, { message: "End user is required" }),
    project_name: z.string().min(1, { message: "Project name is required" }),
    project_stage: z.string().min(1, { message: "Project stage is required" }),
    supply_of: z.string().min(1, { message: "Supply information is required" }),
    region: z.string().min(1, { message: "Region is required" }),
    sector_name: z.string().min(1, { message: "Sector name is required" }),
    closing_date_for_quote: z.string().min(1, { message: "Closing date for quote is required" }),
    quote_number: z.string().min(1, { message: "Quote number is required" }),
    enquiry_received_date: z.string().min(1, { message: "Enquiry received date is required" }),
    quotation_submitted_date: z.string().min(1, { message: "Quotation submitted date is required" }),
    rework_on_quote: z.string().min(1, { message: "Rework on quote is required" }),
    revision_number: z.string().min(1, { message: "Revision number is required" }),
    engineer_quoting: z.string().min(1, { message: "Engineer quoting is required" }),
    approving_manager: z.string().min(1, { message: "Approving manager is required" }),
    account_manager: z.string().min(1, { message: "Account manager is required" }),
    estimate_value_usd: z.string().min(1, { message: "Estimate value in USD is required" }),
    estimate_value_aed: z.string().min(1, { message: "Estimate value in AED is required" }),
    estimate_value_rev0: z.string().min(1, { message: "Estimate value Revision 0 is required" }),
    reason_for_revision: z.string().min(1, { message: "Reason for revision is required" }),
    perc_win_probability: z.string().min(1, { message: "Win probability percentage is required" }),
  }); 

const EnquiryForm = ({ type ,accessToken, enquiry}) => {

    const {toast} = useToast();
    const enquiryData = Array.isArray(enquiry) && enquiry.length > 0 ? enquiry[0] : {};
    const DATE_FORMAT = 'dd-MM-yyyy';

    const parseDate = (dateString) => {
        if (!dateString) return null;
        try {
            // Parse the date string in the format `dd-MM-yyyy`
            return parse(dateString, 'dd-MM-yyyy', new Date());
        } catch (error) {
            console.error('Error parsing date:', error);
            return null;
        }
    };

const filteredEnquiry = enquiryData ? {
    client: enquiryData.client,
    end_user: enquiryData.end_user,
    project_name: enquiryData.project_name,
    project_stage: enquiryData.project_stage,
    supply_of: enquiryData.supply_of,
    region: enquiryData.region,
    sector_name: enquiryData.sector_name,
    closing_date_for_quote: parseDate(enquiryData.closing_date_for_quote),
    quote_number: enquiryData.quote_number,
    enquiry_received_date: parseDate(enquiryData.enquiry_received_date),
    quotation_submitted_date: parseDate(enquiryData.quotation_submitted_date),
    rework_on_quote: enquiryData.rework_on_quote,
    revision_number: enquiryData.revision_number,
    engineer_quoting: enquiryData.engineer_quoting,
    approving_manager: enquiryData.approving_manager,
    account_manager: enquiryData.account_manager,
    estimate_value_usd: enquiryData.estimate_value_usd,
    estimate_value_aed: enquiryData.estimate_value_aed,
    estimate_value_rev0: enquiryData.estimate_value_rev0,
    reason_for_revision: enquiryData.reason_for_revision,
    perc_win_probability: enquiryData.perc_win_probability,
} : {};
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            client: "",
            end_user: "",
            project_name: "", // Updated field name
            project_stage: "",
            supply_of: "",
            region: "",
            sector_name: "", // Updated field name
            closing_date_for_quote: "", // Updated field name
            quote_number: "", // Updated field name
            enquiry_received_date: "",
            quotation_submitted_date: "",
            rework_on_quote: "",
            revision_number: "",
            engineer_quoting: "",
            approving_manager: "",
            account_manager: "",
            estimate_value_usd: "",
            estimate_value_aed: "",
            estimate_value_rev0: "",
            reason_for_revision: "",
            perc_win_probability: "",
        },
    });

    useEffect(() => {
        // Only reset the form if enquiryData is not empty
        if (Object.keys(enquiryData).length > 0) {
            form.reset(enquiryData);
        }
    }, [enquiryData]);

    const onSubmit = async(values)=> {
        const formattedValues = {
            ...values,
            closing_date_for_quote: format(values.closing_date_for_quote, "dd-MM-yyyy"),
            enquiry_received_date: format(values.enquiry_received_date, "dd-MM-yyyy"),
            quotation_submitted_date: format(values.quotation_submitted_date, "dd-MM-yyyy"),
          };
        try{
           if(accessToken){
             if(type === 'Add'){
                const response = await addEnquiry(accessToken,formattedValues);
                if(response.status == 200){
                 toast({
                     description: 'Enquiry Form Submitted succesfully'
                 })
                }
             }
             else{
                const formattedValues = {
                    ...values,
                    closing_date_for_quote: format(values.closing_date_for_quote, "dd-MM-yyyy"),
                    enquiry_received_date: format(values.enquiry_received_date, "dd-MM-yyyy"),
                    quotation_submitted_date: format(values.quotation_submitted_date, "dd-MM-yyyy"),
                    status:null
                  };
                const response = await updateEnquiry(accessToken,formattedValues);
                if(response.status == 200){
                    toast({
                        description: 'Enquiry Form updated  succesfully'
                    })
                   }
             }
               
           }
        }catch(error){
            console.log('error',error);
        }
        }

    return (
        <div className='w-full h-full flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
                <h2 className='font-semibold md:text-[34px] text-[22px]'>{type} Enquiry</h2>
                <p className='text-gray-600 text-14'>Please fill in the details!</p>
            </div>
            <div className='grid xl:grid-cols-2 gap-4'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className='flex flex-col gap-4 w-full'>
                            <div className='flex w-full gap-4'>
                                <CustomInput control={form.control} name='client' label='Client' placeholder='Enter client name' />
                                <CustomInput control={form.control} name='end_user' label='Enduser' placeholder='Enter enduser name' />
                            </div>
                            <CustomInput control={form.control} name='project_name' label='Project name' placeholder='Enter Project name' />
                            <div className='flex w-full gap-4'>
                                <CustomInput control={form.control} name='project_stage' label='Project stage' placeholder='Enter Project Stage' />
                                <CustomInput control={form.control} name='supply_of' label='Supply of' placeholder='Enter Supply name' />
                            </div>
                            <div className='flex w-full gap-4'>
                                <CustomSelect control={form.control} name='region' label='Region' placeholder='Select your region' data={CountryList} />
                                <CustomInput control={form.control} name='sector_name' label='Sector name' placeholder='Enter Sector name' /> {/* Updated field name */}
                            </div>
                            <div className='flex w-full gap-4'>
                                <CustomDate control={form.control} name='closing_date_for_quote' label='Closing date for quote' placeholder='Select a date' /> {/* Updated field name */}
                                <CustomInput control={form.control} name='quote_number' label='Quote Number' placeholder='Enter Quote No' /> {/* Updated field name */}
                            </div>
                            <div className='flex md:flex-row flex-col w-full gap-4'>
                                <CustomDate control={form.control} name='enquiry_received_date' label='Enquiry received date' placeholder='Select a date' />
                                <CustomDate control={form.control} name='quotation_submitted_date' label='Quotation submitted date' placeholder='Select a date' />
                            </div>
                            <div className='flex w-full gap-4 md:flex-row flex-col'>
                                <CustomSelect control={form.control} name='rework_on_quote' label='Rework on quote' placeholder='Select an option' data={SelectBoolean} />
                                <CustomInput control={form.control} name='revision_number' label='Revision number' placeholder='Enter revision number' />
                            </div>
                            <CustomInput control={form.control} name='engineer_quoting' label='Engineer quoting' placeholder='Enter the details' />
                            <div className='flex w-full gap-4 md:flex-row flex-col'>
                                <CustomInput control={form.control} name='approving_manager' label='Approving Manager' placeholder='Enter approving manager name' />
                                <CustomInput control={form.control} name='account_manager' label='Account Manager' placeholder='Enter account manager name' />
                            </div>
                            <div className='flex w-full gap-4 md:flex-row flex-col'>
                                <CustomInput control={form.control} name='estimate_value_usd' label='Budget in USD' placeholder='Enter the amount' />
                                <CustomInput control={form.control} name='estimate_value_aed' label='Budget in AED' placeholder='Enter the amount' />
                                <CustomInput control={form.control} name='estimate_value_rev0' label='Budget Revision 0' placeholder='Enter the amount' />
                            </div>
                            <div className='flex w-full gap-4 md:flex-row flex-col'>
                                <CustomInput control={form.control} name='reason_for_revision' label='Reason for revision' placeholder='Enter Reason' />
                                <CustomSelect control={form.control} name='perc_win_probability' label='Percentage win probability' placeholder='Select an option' data={Percentage} />
                            </div>
                        </div>
                        <div className='flex w-full'>
                            <Button className='form-btn w-full' type="submit">
                                {type === 'Add' ? 'Add Enquiry' : 'Update Enquiry'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default EnquiryForm;
