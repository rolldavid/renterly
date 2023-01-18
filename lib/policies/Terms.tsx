import { terms } from './TermsHTML'

export default function Policy() {

    return (
        <div>
                <div dangerouslySetInnerHTML={{ __html:  terms}} />
               
        </div>
    )
}