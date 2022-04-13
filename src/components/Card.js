import React from 'react'

/*Popup component*/ 
const Card = (props) => {

    const AreaDetails = () => {
        let details = props.areaDetails;
        if (details) {
            return (
                <>
                    <li className="list-group-item">Delivery Status - {details.DeliveryStatus}</li>
                    <li className="list-group-item">Region - {details.Region}</li>
                    <li className="list-group-item">State - {details.State}</li>
                    <li className="list-group-item">Country - {details.Country}</li>
                </>
            );
        }
    }

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header danger">
                            <h5 className="modal-title" id="exampleModalLabel">Area Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ol className="list-group list-group-numbered">
                                <AreaDetails />
                            </ol>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
