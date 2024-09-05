interface ChildComponentProps {
    sendDataToParent: (data: string) => void; // Adjust the type if needed
  }

export const DetailsView:React.FC<ChildComponentProps> = ({ sendDataToParent }) =>{

    const handleBackClick = () =>{
            sendDataToParent('')
    }
    return(   
        <>
        <div>
            <button onClick={handleBackClick}> Back </button>
        </div>
        </>
    )
}