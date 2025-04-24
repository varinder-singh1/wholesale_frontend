import Link from "next/link"
const TermCondation = () => {

    return (
        <>
            <div className="flex " >
                <input type="checkbox"  required/> <p className="mx-1">I have read and agree to the website <Link className="text-blue-600" href="term-condtion" >terms & conditions</Link></p>
            </div>
        </>
    )
}
export default TermCondation;