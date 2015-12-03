 /**
 *    Format Date for human readability
 */
export function formatDate(stamp, style = 'long') {
    var d = new Date(stamp);
    if( style === 'long'){
        return d.toLocaleString();
    }
    else{
        return d.toLocaleDateString();
    }
};