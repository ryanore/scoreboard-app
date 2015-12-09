 /**
  *    Format Date for human readability
  */
 export function errMap(errs, returnArray) {
 	let dbErrs = JSON.parse(errs);
 	let errors = dbErrs ? dbErrs.errors : {};
 	_.each(errors, (data, i) => {
 		if (data.message === 'unique') {
 			returnArray.push(`the ${data.path} ${data.value} is already taken`);
 		}
 		if (data.type === 'required') {
 			returnArray.push(`the ${data.path} field is required`);
 		}
 		if (data.message === 'not valid') {
 			returnArray.push(`the ${data.path} field is not valid`);
 		}
 	});
 	return returnArray;
 };
