import { Tooltip } from '@mui/material'
import './Landingpage.css'

export const Landingpage: any = () =>{
    
    return (
        <section className="landing-container">
            <Tooltip title="Cook" arrow>
            <div className='selectors'>
            <img src='../cooking.png'></img>
            </div>
            </Tooltip>
            <Tooltip title="Maid" arrow>
            <div className='selectors'>
                <img src='../cleaner.png'></img>
            </div>
            </Tooltip>
            <Tooltip title="Nanny" arrow>
            <div className='selectors'>
            <img src='../babysitter.png'></img>
            </div>
            </Tooltip>
            
        </section>
    )
    
}