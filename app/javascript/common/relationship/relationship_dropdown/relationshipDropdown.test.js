import relationshipDropdown from './relationshipDropdown';
import {
  clientFrodoFormatted,
  clientGandalfFormatted,
  clientHarmoineFormatted,
  clientGandalfNoDOBFormatted,
  clientHarmoineNoDOBFormatted,
  clientFrodoUnknowGenderFromatted,
  clientFrodoUnkownGenderNoDOBFormatted,
  clientHarmoineUnknowGenderNoDOBFormatted,
  clientGandalfUnknowGenderFormatted,
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
} from './testHelperConstants';

describe('RelationshipDropdown', () => {
  describe('#1bothHaveDOBandGender | Younger Male - Older Male', () => {
    const wrapper = relationshipDropdown(
      clientFrodoFormatted,
      clientGandalfFormatted
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
      clientGandalfFormatted,
      clientFrodoFormatted
    );

    it('should return only | Older Male - Younger Male', () => {
      expect(wrapper).toEqual(expect.arrayContaining([genderCodeMm]));
    });
  });

  describe('#3bothHaveDOBandGender | Older Female - Younger Male', () => {
    const wrapper = relationshipDropdown(
      clientHarmoineFormatted,
      clientFrodoFormatted
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
      clientFrodoUnknowGenderFromatted,
      clientGandalfFormatted
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
      clientGandalfUnknowGenderFormatted,
      clientFrodoFormatted
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
      clientGandalfFormatted,
      clientFrodoUnknowGenderFromatted
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
      clientGandalfUnknowGenderFormatted,
      clientFrodoUnknowGenderFromatted
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
      clientFrodoFormatted,
      clientGandalfNoDOBFormatted
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
      clientHarmoineNoDOBFormatted,
      clientFrodoFormatted
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
      clientFrodoUnkownGenderNoDOBFormatted,
      clientHarmoineUnknowGenderNoDOBFormatted
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
      clientFrodoUnkownGenderNoDOBFormatted,
      clientGandalfNoDOBFormatted
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
      clientGandalfNoDOBFormatted,
      clientFrodoUnkownGenderNoDOBFormatted
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
