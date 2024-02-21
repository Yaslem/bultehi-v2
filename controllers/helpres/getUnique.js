import {
    createCounties,
    createCenters, createRanking, createStudents,
    createSchools,
    createStates, createTypes,
    getCountyByName, getCenterByName, getSchoolByName,
    getStateByName, getCategoriesForStudents, getUnknown,
} from "../Result";
import dayjs from 'dayjs';
import prisma from "../../helpers/db";

export default class GetUnique {

    // data get from file
    results = []
    states = []
    counties = []
    schools = []
    centers = []
    types = []

    yearId = 0
    typeId = 0
    sessionId = 0
    slug = 0
    resultId = 0

    allIsReady = false
    stateIsReady = false
    countyIsReady = false
    schoolIsReady = false
    centerIsReady = false
    typeIsReady = false
    studentIsReady = false

    students = []

    constructor({results, states, counties, schools, centers, types, yearId, typeId, sessionId, slug, resultId}) {
        this.results = results
        this.states = states
        this.counties = counties
        this.schools = schools
        this.centers = centers
        this.types = types
        this.yearId = yearId
        this.typeId = typeId
        this.sessionId = sessionId
        this.slug = slug
        this.resultId = resultId
    }

    async processor(){
        await this.createStates()
        if(
            this.stateIsReady &&
            this.countyIsReady &&
            this.schoolIsReady &&
            this.centerIsReady &&
            this.studentIsReady
        ){
            this.allIsReady = true
        }
    }


    async createStates (){
        console.log("i am at states")
        const res  = await createStates(this.states)
        if(res){
            this.stateIsReady = true
            await this.createCounties()
        }
    }

    async createCounties (){
        console.log("i am at counties")
        if(this.stateIsReady){
            const res  = await createCounties(this.counties)
            if(res){
                this.countyIsReady = true
                await this.createSchools()
            }
        }
    }

    async createSchools (){
        console.log("i am at schools")
        if(this.countyIsReady){
            const res  = await createSchools(this.schools)
            if(res){
                this.schoolIsReady = true
                await this.createCenters()
            }
        }
    }

    async createCenters (){
        console.log("i am at centers")
        if(this.schoolIsReady){
            const res  = await createCenters(this.centers)
            if(res){
                this.centerIsReady = true
                if(this.slug === 5){
                    await this.createTypes()
                } else {
                    await this.createStudents()
                }
            }
        }
    }

    async createTypes (){
        if(this.centerIsReady){
            let newTypes = []
            this.types.map((type, index) => {
                if(index > 0){
                    switch (type.type.trim().toUpperCase()) {
                        case 'SN':
                            newTypes.push({
                                nameAr: 'العلوم الطبيعية',
                                nameFr: type.type,
                            });
                            break;
                        case 'SNE':
                            newTypes.push({
                                nameAr: 'العلوم الطبيعية التجريبية',
                                nameFr: type.type,
                            });
                            break;
                        case 'LM':
                            newTypes.push({
                                nameAr: 'الآداب العصرية',
                                nameFr: type.type,
                            });
                            break;
                        case 'LME':
                            newTypes.push({
                                nameAr: 'الآداب العصرية التجريبية',
                                nameFr: type.type,
                            });
                            break;
                        case 'LO':
                            newTypes.push({
                                nameAr: 'الآداب الأصلية',
                                nameFr: type.type,
                            });
                            break;
                        case 'M':
                            newTypes.push({
                                nameAr: 'الرياضيات',
                                nameFr: type.type,
                            });
                            break;
                        case 'ME':
                            newTypes.push({
                                nameAr: 'الرياضيات التجريبية',
                                nameFr: type.type,
                            });
                            break;
                        case 'TM':
                            newTypes.push({
                                nameAr: 'التقنية',
                                nameFr: type.type,
                            });
                            break;
                        case 'LA':
                            newTypes.push({
                                nameAr: 'اللغات',
                                nameFr: type.type,
                            });
                            break;
                        case 'TS':
                            newTypes.push({
                                nameAr: 'الهندسة الكهربائية',
                                nameFr: type.type,
                            });
                            break;
                        default:
                            newTypes.push({
                                nameAr: '---',
                                nameFr: type.type,
                            });
                    }
                }
            })
            this.types = newTypes

            const res  = await createTypes(this.types)
            if(res){
                this.typeIsReady = true
                await this.createStudents()
            }

        }
    }

    getBirth(birth) {
        if(birth){
            if(this.slug === 1){
                const newBirth = `${birth.toString().trim()}-01-01`
                return new Date(newBirth)
            }
            return birth
        }
        return null
    }
    async createStudents (){
        switch (this.slug) {
            case 1:
                if(this.centerIsReady){
                    let number = 0
                    const chunkSize = this.results.length / 10
                    const unknown = await getUnknown()
                    for (let start = 0; start < this.results.length; start += chunkSize) {
                        const chunk = this.results.slice(start, start + chunkSize + 1)
                        let students = []
                        await Promise.all(chunk.map( async (result, index) => {
                            if (index > 0){
                                const {state, county, school, center} = await getCategoriesForStudents({result})
                                students.push({
                                    stateId: state?.id || null,
                                    countyId: county?.id || null,
                                    schoolId: school?.id || null,
                                    centerId: center?.id || null,
                                    unknownId: (state && county && school && center) ? null : unknown.id,
                                    typeResultId: this.typeId,
                                    yearId: this.yearId,
                                    resultId: this.resultId,

                                    name: result.name?.replaceAll("ـ", ""),
                                    rankingInCountry: result.rankingInCountry,
                                    rankingInState: result.rankingInState,
                                    rankingInCounty: result.rankingInCounty,
                                    rankingInSchool: result.rankingInSchool,
                                    number: parseInt(result.number),
                                    birth: this.getBirth(result.birth),
                                    degree: result.degree,
                                    decision: result.decision,
                                })
                            }
                        }))
                        const res  = await createStudents({students})
                        if(res){
                            console.log("i am at:", number)
                            number += 1
                            students = []
                        }
                    }
                    if((number - 1) === 10){
                        this.studentIsReady = true
                    }
                }
                break
            case 2:
                if(this.centerIsReady){
                    let number = 0
                    const chunkSize = this.results.length / 10
                    const unknown = await getUnknown()
                    for (let start = 0; start < this.results.length; start += chunkSize) {
                        const chunk = this.results.slice(start, start + chunkSize + 1)
                        let students = []
                        await Promise.all(chunk.map( async (result, index) => {
                            if (index > 0){
                                const {state, county, school, center} = await getCategoriesForStudents({result})
                                students.push({
                                    stateId: state?.id || null,
                                    countyId: county?.id || null,
                                    schoolId: school?.id || null,
                                    centerId: center?.id || null,
                                    unknownId: (state && county && school && center) ? null : unknown.id,
                                    typeResultId: this.typeId,
                                    yearId: this.yearId,
                                    resultId: this.resultId,
                                    name: result.name?.replaceAll("ـ", "") || null,
                                    rankingInCountry: result.rankingInCountry,
                                    rankingInState: result.rankingInState,
                                    rankingInCounty: result.rankingInCounty,
                                    rankingInSchool: result.rankingInSchool,
                                    number: parseInt(result.number),
                                    birth: this.getBirth(result.birth),
                                    degree: result.degree,
                                    decision: result.decision,
                                })
                            }
                        }))
                        const res  = await createStudents({students})
                        if(res){
                            console.log("i am at:", number)
                            number += 1
                            students = []
                        }
                    }
                    if((number - 1) === 10){
                        this.studentIsReady = true
                    }
                }
                break
            case 3:
                break
            case 4:
                break
            case 5:
                if(this.typeIsReady){
                    let number = 0
                    const chunkSize = this.results.length / 10
                    const unknown = await getUnknown()
                    for (let start = 0; start < this.results.length; start += chunkSize) {
                        const chunk = this.results.slice(start, start + chunkSize + 1)
                        let students = []
                        await Promise.all(chunk.map( async (result, index) => {
                            if (index > 0){
                                const {state, county, school, center, type} = await getCategoriesForStudents({result})
                                students.push({
                                    stateId: state?.id || null,
                                    countyId: county?.id || null,
                                    schoolId: school?.id || null,
                                    centerId: center?.id || null,
                                    unknownId: (state && county && school && center) ? null : unknown.id,
                                    typeResultId: this.typeId,
                                    yearId: this.yearId,
                                    resultId: this.resultId,
                                    typeId: type.id,
                                    sessionId: this.sessionId,
                                    name: result.name.replaceAll("ـ", ""),
                                    rankingInCountry: result.rankingInCountry,
                                    rankingInState: result.rankingInState,
                                    rankingInCounty: result.rankingInCounty,
                                    rankingInSchool: result.rankingInSchool,
                                    number: parseInt(result.number),
                                    birth: this.getBirth(result.birth),
                                    degree: result.degree,
                                    decision: result.decision,
                                })
                            }
                        }))
                        const res  = await createStudents({students})
                        if(res){
                            console.log("i am at:", number)
                            number += 1
                            students = []
                        }
                    }
                    if((number - 1) === 10){
                        this.studentIsReady = true
                    }
                }
                break
        }
    }
}