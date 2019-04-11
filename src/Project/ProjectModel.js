import Model from "ReactAxiom";

class ProjectModel extends Model {

    static defaultState() {
      return {
        id: null,
        description: '',
        completed: false
      };
    }
  
  }