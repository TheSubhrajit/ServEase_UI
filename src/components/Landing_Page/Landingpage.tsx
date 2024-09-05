import { Tooltip } from '@mui/material'
import './Landingpage.css'

export const Landingpage: any = () =>{

    const handleSelectionClick = (e:any) =>{
        console.log(e)
        
    }
    
    return (
        <section className="landing-container">
            <Tooltip title="Cook" arrow>
            <div className='selectors' onClick={e =>  handleSelectionClick('cook')}>
            <img src='../cooking.png'></img>
            </div>
            </Tooltip>
            <Tooltip title="Maid" arrow>
            <div className='selectors' onClick={e =>  handleSelectionClick('maid')}>
                <img src='../cleaner.png'></img>
            </div>
            </Tooltip>
            <Tooltip title="Nanny" arrow>
            <div className='selectors' onClick={e =>  handleSelectionClick('nanny')}>
            <img src='../babysitter.png'></img>
            </div>
            </Tooltip>
            
        </section>
    )
    
}