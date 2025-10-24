// let Table = (props) => {
//     let data = props.data.data
//     console.log(data);

//     return (
//         <>
//             <h1>Candidate Employee</h1>
//             <table border={1}>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.filter(x => x.isDeleted === false).map(x => {
//                         return (
//                             <tr>
//                                 <td>{x.id}</td>
//                                 <td>{x.name}</td>
//                             </tr>
//                         )
//                     })}
//                 </tbody>
//             </table >
//         </>
//     )
// }

let TableListCandidateEmployee = () => {
    return (
        <div>
            <h1>Candidate Employee</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Place and Date of Birth</th>
                        <th>Phone Number</th>
                        <th>CV</th>
                        <th>Portofolio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>data.Name</th>
                        <th>data.Place and Date of Birth</th>
                        <th>data.Phone Number</th>
                        <th>data.CV</th>
                        <th>data.Portofolio</th>
                    </tr>
                </tbody>
            </table >
        </div>
    )
}

export default TableListCandidateEmployee