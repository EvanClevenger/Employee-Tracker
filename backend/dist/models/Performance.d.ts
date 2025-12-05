import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    employeeLastName: string;
    monthlyErrors: mongoose.Types.DocumentArray<{
        month: string;
        salesforceErrors: number;
        jiraErrors: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        month: string;
        salesforceErrors: number;
        jiraErrors: number;
    }> & {
        month: string;
        salesforceErrors: number;
        jiraErrors: number;
    }>;
    lastUpdated: NativeDate;
    salesforce?: {
        totalCasesToDate: number;
        totalCasesThisYear: number;
        crossConnects: number;
        disconnects: number;
        errorsPerCase: number;
    } | null;
    jira?: {
        timeSpentHours: number;
        casesAssignedThisYear: number;
    } | null;
    serviceNow?: {
        billableHours: number;
        nonBillableHours: number;
    } | null;
    UKG?: {
        directLaborHours: number;
        capexLaborHours: number;
        defferedLaborHours: number;
    } | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    employeeLastName: string;
    monthlyErrors: mongoose.Types.DocumentArray<{
        month: string;
        salesforceErrors: number;
        jiraErrors: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        month: string;
        salesforceErrors: number;
        jiraErrors: number;
    }> & {
        month: string;
        salesforceErrors: number;
        jiraErrors: number;
    }>;
    lastUpdated: NativeDate;
    salesforce?: {
        totalCasesToDate: number;
        totalCasesThisYear: number;
        crossConnects: number;
        disconnects: number;
        errorsPerCase: number;
    } | null;
    jira?: {
        timeSpentHours: number;
        casesAssignedThisYear: number;
    } | null;
    serviceNow?: {
        billableHours: number;
        nonBillableHours: number;
    } | null;
    UKG?: {
        directLaborHours: number;
        capexLaborHours: number;
        defferedLaborHours: number;
    } | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    employeeLastName: string;
    monthlyErrors: mongoose.Types.DocumentArray<{
        month: string;
        salesforceErrors: number;
        jiraErrors: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        month: string;
        salesforceErrors: number;
        jiraErrors: number;
    }> & {
        month: string;
        salesforceErrors: number;
        jiraErrors: number;
    }>;
    lastUpdated: NativeDate;
    salesforce?: {
        totalCasesToDate: number;
        totalCasesThisYear: number;
        crossConnects: number;
        disconnects: number;
        errorsPerCase: number;
    } | null;
    jira?: {
        timeSpentHours: number;
        casesAssignedThisYear: number;
    } | null;
    serviceNow?: {
        billableHours: number;
        nonBillableHours: number;
    } | null;
    UKG?: {
        directLaborHours: number;
        capexLaborHours: number;
        defferedLaborHours: number;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    employeeLastName: string;
    monthlyErrors: mongoose.Types.DocumentArray<{
        month: string;
        salesforceErrors: number;
        jiraErrors: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        month: string;
        salesforceErrors: number;
        jiraErrors: number;
    }> & {
        month: string;
        salesforceErrors: number;
        jiraErrors: number;
    }>;
    lastUpdated: NativeDate;
    salesforce?: {
        totalCasesToDate: number;
        totalCasesThisYear: number;
        crossConnects: number;
        disconnects: number;
        errorsPerCase: number;
    } | null;
    jira?: {
        timeSpentHours: number;
        casesAssignedThisYear: number;
    } | null;
    serviceNow?: {
        billableHours: number;
        nonBillableHours: number;
    } | null;
    UKG?: {
        directLaborHours: number;
        capexLaborHours: number;
        defferedLaborHours: number;
    } | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    employeeLastName: string;
    monthlyErrors: mongoose.Types.DocumentArray<{
        month: string;
        salesforceErrors: number;
        jiraErrors: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        month: string;
        salesforceErrors: number;
        jiraErrors: number;
    }> & {
        month: string;
        salesforceErrors: number;
        jiraErrors: number;
    }>;
    lastUpdated: NativeDate;
    salesforce?: {
        totalCasesToDate: number;
        totalCasesThisYear: number;
        crossConnects: number;
        disconnects: number;
        errorsPerCase: number;
    } | null;
    jira?: {
        timeSpentHours: number;
        casesAssignedThisYear: number;
    } | null;
    serviceNow?: {
        billableHours: number;
        nonBillableHours: number;
    } | null;
    UKG?: {
        directLaborHours: number;
        capexLaborHours: number;
        defferedLaborHours: number;
    } | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    employeeLastName: string;
    monthlyErrors: mongoose.Types.DocumentArray<{
        month: string;
        salesforceErrors: number;
        jiraErrors: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        month: string;
        salesforceErrors: number;
        jiraErrors: number;
    }> & {
        month: string;
        salesforceErrors: number;
        jiraErrors: number;
    }>;
    lastUpdated: NativeDate;
    salesforce?: {
        totalCasesToDate: number;
        totalCasesThisYear: number;
        crossConnects: number;
        disconnects: number;
        errorsPerCase: number;
    } | null;
    jira?: {
        timeSpentHours: number;
        casesAssignedThisYear: number;
    } | null;
    serviceNow?: {
        billableHours: number;
        nonBillableHours: number;
    } | null;
    UKG?: {
        directLaborHours: number;
        capexLaborHours: number;
        defferedLaborHours: number;
    } | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=Performance.d.ts.map