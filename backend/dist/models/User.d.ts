import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    email: string;
    password: string;
    lastName: string;
    firstName: string;
    title: string;
    department: "Engineering" | "Security" | "DCO Systems" | "NetOps" | "Sales" | "Business Analyst" | "Junior Engineer";
    startDate: NativeDate;
    profilePicture: string;
    createdAt: NativeDate;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    email: string;
    password: string;
    lastName: string;
    firstName: string;
    title: string;
    department: "Engineering" | "Security" | "DCO Systems" | "NetOps" | "Sales" | "Business Analyst" | "Junior Engineer";
    startDate: NativeDate;
    profilePicture: string;
    createdAt: NativeDate;
}, {}, mongoose.DefaultSchemaOptions> & {
    email: string;
    password: string;
    lastName: string;
    firstName: string;
    title: string;
    department: "Engineering" | "Security" | "DCO Systems" | "NetOps" | "Sales" | "Business Analyst" | "Junior Engineer";
    startDate: NativeDate;
    profilePicture: string;
    createdAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email: string;
    password: string;
    lastName: string;
    firstName: string;
    title: string;
    department: "Engineering" | "Security" | "DCO Systems" | "NetOps" | "Sales" | "Business Analyst" | "Junior Engineer";
    startDate: NativeDate;
    profilePicture: string;
    createdAt: NativeDate;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    email: string;
    password: string;
    lastName: string;
    firstName: string;
    title: string;
    department: "Engineering" | "Security" | "DCO Systems" | "NetOps" | "Sales" | "Business Analyst" | "Junior Engineer";
    startDate: NativeDate;
    profilePicture: string;
    createdAt: NativeDate;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    email: string;
    password: string;
    lastName: string;
    firstName: string;
    title: string;
    department: "Engineering" | "Security" | "DCO Systems" | "NetOps" | "Sales" | "Business Analyst" | "Junior Engineer";
    startDate: NativeDate;
    profilePicture: string;
    createdAt: NativeDate;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=User.d.ts.map