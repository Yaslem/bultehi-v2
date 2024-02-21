import {z} from "zod";

export default class Validate {

     static #checkFileType(file) {
        if (file?.name) {
            const fileType = file.name.split(".").pop();
            if (fileType === "xlsx" || fileType === "CSV") return true;
        }
        return false;
    }

    static createResult = z.object({
        title: z.string({
            required_error: "العنوان مطلوب.",
            invalid_type_error: "العنوان غير صالح.",
        }).min(2, { message: "العنوان يجب أن يكون أطول من حرفين" }),
        file: z.any()
            .refine((file) => this.#checkFileType(file), "فقط ملف اكسل هو المدعوم فقط.")
            .refine((file) => file !== undefined || file?.length !== 0, "الملف مطلوب"),
        yearId: z.number({
            required_error: "السنة مطلوبة.",
            invalid_type_error: "السنة غير صالحة.",
        }),
        typeId: z.number({
            required_error: "النوع مطلوب.",
            invalid_type_error: "النوع غير صالح.",
        }),
        sessionId: z.number({
            required_error: "الدورة مطلوبة.",
            invalid_type_error: "الدورة غير صالحة.",
        }).optional(),
    });
    static updateResult = z.object({
        title: z.string({
            required_error: "العنوان مطلوب.",
            invalid_type_error: "العنوان غير صالح.",
        }).min(2, { message: "العنوان يجب أن يكون أطول من حرفين" }),
        yearId: z.number({
            required_error: "السنة مطلوبة.",
            invalid_type_error: "السنة غير صالحة.",
        }),
        sessionId: z.number({
            required_error: "الدورة مطلوبة.",
            invalid_type_error: "الدورة غير صالحة.",
        }).optional(),
    });
    static searchResult = z.object({
        value: z.string({
            required_error: "القيمة مطلوبة.",
            invalid_type_error: "القيمة غير صالحة.",
        }).min(2, { message: "القيمة يجب أن تكون أطول من حرفين" }),
    });

    static createException = z.object({
        name: z.string({
            required_error: "الاسم مطلوب.",
            invalid_type_error: "الاسم غير صالح.",
        }).min(2, { message: "الاسم يجب أن يكون أطول من حرفين" }),
        value: z.string({
            required_error: "القيمة مطلوب.",
            invalid_type_error: "القيمة غير صالحة.",
        }).min(2, { message: "القيمة يجب أن تكون أطول من حرفين" }),
        degree: z.string({
            required_error: "الدرجة مطلوب.",
            invalid_type_error: "الدرجة غير صالحة.",
        }).min(2, { message: "الدرجة يجب أن تكون أطول من حرفين" }),
        ref: z.string({
            required_error: "المرجع مطلوب.",
            invalid_type_error: "المرجع غير صالح.",
        }).min(2, { message: "المرجع يجب أن يكون أطول من حرفين" }),
        yearId: z.number({
            required_error: "السنة مطلوبة.",
            invalid_type_error: "السنة غير صالحة.",
        }),
        typeId: z.number({
            required_error: "النوع مطلوب.",
            invalid_type_error: "النوع غير صالح.",
        }),
        resultId: z.number({
            required_error: "النتيجة مطلوبة.",
            invalid_type_error: "النتيجة غير صالحة.",
        })
    });
    static updateException = z.object({
        exceptionId: z.number({
            required_error: "معرف الاستثناء مطلوب.",
            invalid_type_error: "معرف الاستثناء غير صالح.",
        }),
        name: z.string({
            required_error: "الاسم مطلوب.",
            invalid_type_error: "الاسم غير صالح.",
        }).min(2, { message: "الاسم يجب أن يكون أطول من حرفين" }),
        value: z.string({
            required_error: "القيمة مطلوب.",
            invalid_type_error: "القيمة غير صالحة.",
        }).min(2, { message: "القيمة يجب أن تكون أطول من حرفين" }),
        degree: z.string({
            required_error: "الدرجة مطلوب.",
            invalid_type_error: "الدرجة غير صالحة.",
        }).min(2, { message: "الدرجة يجب أن تكون أطول من حرفين" }),
        ref: z.string({
            required_error: "المرجع مطلوب.",
            invalid_type_error: "المرجع غير صالح.",
        }).min(2, { message: "المرجع يجب أن يكون أطول من حرفين" }),
        yearId: z.number({
            required_error: "السنة مطلوبة.",
            invalid_type_error: "السنة غير صالحة.",
        }),
        typeId: z.number({
            required_error: "النوع مطلوب.",
            invalid_type_error: "النوع غير صالح.",
        }),
        resultId: z.number({
            required_error: "النتيجة مطلوبة.",
            invalid_type_error: "النتيجة غير صالحة.",
        })
    });
}