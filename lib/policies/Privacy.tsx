import { privacy } from './PrivacyHTML'

export default function Policy() {

    return (
        <div>
                <div dangerouslySetInnerHTML={{ __html:  privacy}} />
               
        </div>
    )
}