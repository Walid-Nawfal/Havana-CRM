import { Message } from "semantic-ui-react";

export interface Props {
    errors: any ;
}
 
export default function ValidationErrors({errors}: Props) {
    return (
        <Message error>
            {/* {console.log("Hi " + errors)} */}
            {errors && (
               <Message.List>
                    {errors.map((err: any, i: any) => {
                        return <Message.Item key={i}> {err} </Message.Item>
                    })}
                </Message.List> 
            )}
        </Message>
    )
}