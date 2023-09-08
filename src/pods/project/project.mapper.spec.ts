import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';

import {
  mapEmployeeSummaryFromApiToVm,
  mapEmployeeSummaryListFromApiToVm,
  mapProjectFromApiToVm,
} from 'pods/project/project.mapper';

describe('mapEmployeeSummaryFromApiToVm specs', () => {
  it('should return empty object when feeding undefined', () => {
    // Arrange
    const employeeSummary = undefined;

    // Act
    const result = mapEmployeeSummaryFromApiToVm(employeeSummary);

    // Assert
    expect(result).toEqual({});
  });

  it('should return empty object when feeding null', () => {
    // Arrange
    const employeeSummary = null;

    // Act
    const result = mapEmployeeSummaryFromApiToVm(employeeSummary);

    // Assert
    expect(result).toEqual({});
  });

  it('should return empty object when feeding empty object', () => {
    // Arrange
    const employeeSummary: any = {};

    // Act
    const result = mapEmployeeSummaryFromApiToVm(employeeSummary);

    // Assert
    expect(result).toEqual({});
  });

  it('should return a View Model object with same properties as Api Model object', () => {
    // Arrange
    const employeeSummary: apiModel.EmployeeSummary = {
      id: '1',
      isAssigned: true,
      employeeName: 'John Doe',
    };

    const expectedSummary: viewModel.EmployeeSummary = {
      id: '1',
      isAssigned: true,
      employeeName: 'John Doe',
    };

    // Act
    const result: viewModel.EmployeeSummary =
      mapEmployeeSummaryFromApiToVm(employeeSummary);

    // Assert
    expect(result).toEqual(expectedSummary);
  });
});

describe('mapEmployeeSummaryListFromApiToVm specs', () => {
  it('should return empty array when feeding undefined', () => {
    // Arrange
    const employeeSummaryList = undefined;

    // Act
    const result = mapEmployeeSummaryListFromApiToVm(employeeSummaryList);

    // Assert
    expect(result).toEqual([]);
  });

  it('should return empty array when feeding null', () => {
    // Arrange
    const employeeSummaryList = null;

    // Act
    const result = mapEmployeeSummaryListFromApiToVm(employeeSummaryList);

    // Assert
    expect(result).toEqual([]);
  });

  it('should return empty array when feeding empty array', () => {
    // Arrange
    const employeeSummaryList = [];

    // Act
    const result = mapEmployeeSummaryListFromApiToVm(employeeSummaryList);

    // Assert
    expect(result).toEqual([]);
  });

  it('should return one item with same values when passing one item', () => {
    // Arrange
    const employeeSummaryList: apiModel.EmployeeSummary[] = [
      {
        id: '1',
        isAssigned: true,
        employeeName: 'John Doe',
      },
    ];

    const expectedSummaryList: viewModel.EmployeeSummary[] = [
      {
        id: '1',
        isAssigned: true,
        employeeName: 'John Doe',
      },
    ];

    // Act
    const result = mapEmployeeSummaryListFromApiToVm(employeeSummaryList);

    // Assert
    expect(result).toEqual(expectedSummaryList);
  });

  it('should return two item with same values when passing two item. As "isAssigned" is optional, is not included in second item', () => {
    // Arrange
    const employeeSummaryList: apiModel.EmployeeSummary[] = [
      {
        id: '1',
        isAssigned: true,
        employeeName: 'John Doe',
      },
      {
        id: '2',
        employeeName: 'Mary Random',
      },
    ];

    const expectedResult: viewModel.EmployeeSummary[] = [
      {
        id: '1',
        isAssigned: true,
        employeeName: 'John Doe',
      },
      {
        id: '2',
        employeeName: 'Mary Random',
      },
    ];

    // Act
    const result = mapEmployeeSummaryListFromApiToVm(employeeSummaryList);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});

describe('mapProjectFromApiToVm specs', () => {
  it('should return createEmptyProject function result when feeding undefined', () => {
    // Arrange
    const project = undefined;
    const expectedResult: viewModel.Project = {
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return createEmptyProject function result when feeding null', () => {
    // Arrange
    const project = null;
    const expectedResult: viewModel.Project = {
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return same object but mapped employees property when feeding empty object', () => {
    // Arrange
    const project: any = {};
    const expectedResult = {
      ...project,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return same object but mapped employees property when feeding project object', () => {
    // Arrange
    const project: apiModel.Project = {
      id: '1',
      name: 'Project Test',
      externalId: '123',
      comments: 'test comments',
      isActive: true,
      employees: [
        {
          id: '1',
          isAssigned: true,
          employeeName: 'John Doe',
        },
        {
          id: '2',
          employeeName: 'Mary Random',
        },
      ],
    };
    const expectedResult = {
      id: '1',
      name: 'Project Test',
      externalId: '123',
      comments: 'test comments',
      isActive: true,

      employees: [
        {
          id: '1',
          isAssigned: true,
          employeeName: 'John Doe',
        },
        {
          id: '2',
          employeeName: 'Mary Random',
        },
      ],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
