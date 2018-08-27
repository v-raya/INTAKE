import relationshipDropdown from 'common/relationship/relationship_dropdown/relationshipDropdown';
import {
  clientFrodo,
  clientGandalf,
  clientHarmoine,
  clientGandalfNoDOB,
  clientHarmoineNoDOB,
  clientFrodoUnknowGender,
  clientFrodoUnkownGenderNoDOB,
  clientHarmoineUnknowGenderNoDOB,
  clientGandalfUnknowGender,
  genderCodeFF,
  genderCodefF,
  genderCodeFf,
  genderCodefM,
  genderCodeFm,
  genderCodeFM,
  genderCodemF,
  genderCodeMf,
  genderCodeMF,
  genderCodeMm,
  genderCodemM,
  genderCodeMM,
} from './helperMethodsSpec';

describe('RelationshipDropdown', () => {
  describe('#1bothHaveDOBandGender | Younger Male - Older Male', () => {
    const wrapper = relationshipDropdown(
      clientFrodo,
      clientGandalf
    );

    it('should return only | Male - Male', () => {
      expect(wrapper).toEqual(expect.arrayContaining([genderCodeMM]));
      expect(wrapper).not.toEqual(expect.arrayContaining([genderCodeFM]));
    });

    it('should return only | Younger Male - Older Male', () => {
      expect(wrapper).toEqual(expect.arrayContaining([genderCodemM]));
    });
  });

  describe('#2bothHaveDOBandGender | Older Male - Younder Male', () => {
    const wrapper = relationshipDropdown(
      clientGandalf,
      clientFrodo
    );

    it('should return only | Older Male - Younger Male', () => {
      expect(wrapper).toEqual(expect.arrayContaining([genderCodeMm]));
    });
  });

  describe('#3bothHaveDOBandGender | Older Female - Younger Male', () => {
    const wrapper = relationshipDropdown(
      clientHarmoine,
      clientFrodo
    );
    it('should return only | Female - Male', () => {
      expect(wrapper).toEqual(expect.arrayContaining([genderCodeFM]));
      expect(wrapper).not.toEqual(expect.arrayContaining([genderCodeMM]));
    });

    it('should return only | Older Female - younger Male', () => {
      expect(wrapper).toEqual(expect.arrayContaining([genderCodeFm]));
    });
  });

  describe('#4.1bothHaveDOBnoPrmaryGender Primary Younger', () => {
    const wrapper = relationshipDropdown(
      clientFrodoUnknowGender,
      clientGandalf
    );

    it('should return mixed younger and Older Male', () => {
      expect(wrapper).toEqual(
        expect.arrayContaining([
          genderCodeMM,
          genderCodemM,
          genderCodeFM,
          genderCodefM,
        ])
      );
      expect(wrapper).not.toEqual(
        expect.arrayContaining([genderCodeMm, genderCodeFm])
      );
    });
  });

  describe('#4.2bothHaveDOBnoPrmaryGender Secondary Younger', () => {
    const wrapper = relationshipDropdown(
      clientGandalfUnknowGender,
      clientFrodo
    );

    it('should return mixed younger and Older Male', () => {
      expect(wrapper).toEqual(
        expect.arrayContaining([
          genderCodeMM,
          genderCodeMm,
          genderCodeFM,
          genderCodeFm,
        ])
      );
      expect(wrapper).not.toEqual(
        expect.arrayContaining([genderCodemM, genderCodefM])
      );
    });
  });

  describe('#5bothHaveDOBnoSecndryGender Secondary Gender Unknow', () => {
    const wrapper = relationshipDropdown(
      clientGandalf,
      clientFrodoUnknowGender
    );

    it('should return mixed older and Younger Male', () => {
      expect(wrapper).toEqual(
        expect.arrayContaining([
          genderCodeMm,
          genderCodeMf,
          genderCodeMF,
          genderCodeMM,
        ])
      );
      expect(wrapper).not.toEqual(
        expect.arrayContaining([genderCodemM, genderCodefM])
      );
    });
  });

  describe('#6bothHaveDOBnoGender Both Gender Unknown', () => {
    const wrapper = relationshipDropdown(
      clientGandalfUnknowGender,
      clientFrodoUnknowGender
    );

    it('should return mixed older and Younger Male', () => {
      expect(wrapper).toEqual(
        expect.arrayContaining([
          genderCodeMm,
          genderCodeMf,
          genderCodeMF,
          genderCodeMM,
          genderCodeFm,
          genderCodeFf,
          genderCodeFF,
        ])
      );
      expect(wrapper).not.toEqual(
        expect.arrayContaining([genderCodemM, genderCodefM])
      );
    });
  });

  describe('#7NotbothHaveDOB && bothHaveKnownGender Both Known Gender UnKnown DOB', () => {
    const wrapper = relationshipDropdown(
      clientFrodo,
      clientGandalfNoDOB
    );

    it('should return only Older or Younger Male gender', () => {
      expect(wrapper).toEqual(
        expect.arrayContaining([genderCodeMM, genderCodemM, genderCodeMm])
      );
      expect(wrapper).not.toEqual(
        expect.arrayContaining([genderCodeFM, genderCodemF, genderCodeFm])
      );
    });
  });

  describe('#8NotbothHaveDOB && bothHaveKnownGender - Female Known Gender UnKnown DOB', () => {
    const wrapper = relationshipDropdown(
      clientHarmoineNoDOB,
      clientFrodo
    );

    it('should return only Older or Younger Female gender', () => {
      expect(wrapper).toEqual(
        expect.arrayContaining([genderCodeFM, genderCodeFm, genderCodefM])
      );
      expect(wrapper).not.toEqual(
        expect.arrayContaining([genderCodeMM, genderCodemM, genderCodeMm])
      );
    });
  });

  describe('#9.1noDOBnoGender Both DOB & Gender Unknown', () => {
    const wrapper = relationshipDropdown(
      clientFrodoUnkownGenderNoDOB,
      clientHarmoineUnknowGenderNoDOB
    );

    it('should return mixed list', () => {
      expect(wrapper).toEqual(
        expect.arrayContaining([
          genderCodeMF,
          genderCodemF,
          genderCodeFF,
          genderCodefF,
          genderCodeFM,
          genderCodeFm,
          genderCodeFf,
        ])
      );
    });
  });

  describe('#9.2noDOBnoGender Primary DOB & Gender Unknown', () => {
    const wrapper = relationshipDropdown(
      clientFrodoUnkownGenderNoDOB,
      clientGandalfNoDOB
    );

    it('should return mixed list', () => {
      expect(wrapper).toEqual(
        expect.arrayContaining([
          genderCodeMM,
          genderCodemM,
          genderCodeFM,
          genderCodefM,
          genderCodeFm,
        ])
      );
    });
  });

  describe('#9.3noDOBnoGender Secondary DOB & Gender Unknown', () => {
    const wrapper = relationshipDropdown(
      clientGandalfNoDOB,
      clientFrodoUnkownGenderNoDOB
    );

    it('should return mixed list', () => {
      expect(wrapper).toEqual(
        expect.arrayContaining([
          genderCodeMF,
          genderCodemM,
          genderCodeMf,
          genderCodeMm,
          genderCodemF,
        ])
      );
    });
  });
});
